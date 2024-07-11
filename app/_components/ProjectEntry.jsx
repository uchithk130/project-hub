
"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/button';
import { useUser } from '@clerk/nextjs';

const departments = ['CSE', 'EEE', 'ECE', 'MEC', 'CIV', 'Data-Science', 'AI', 'ML','Automobile' ,'Other'];
const technologies = [
  'Java', 'Python', 'JavaScript', 'Autocad', 'Matlab', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
  'R', 'Go', 'Perl', 'Scala', 'Haskell', 'Rust', 'TypeScript', 'SQL', 'NoSQL', 'HTML', 'CSS', 'SASS',
  'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'React', 'Angular', 'Vue.js', 'Spring', 'Django', 'Flask',
  'SolidWorks', 'CATIA', 'Pro/ENGINEER', 'ANSYS', 'STAAD.Pro', 'ETABS', 'Revit', 'PLC', 'SCADA', 'Simulink',
  'Hadoop', 'Spark', 'TensorFlow', 'Keras', 'PyTorch', 'Jupyter', 'Pandas', 'NumPy', 'SciPy', 'NLTK', 'Spacy', 'Other'
];

const ProjectEntry = ({ isOpen, onClose }) => {
  const initialFormData = {
    projectName: '',
    projectAim: '',
    departments: [],
    projectAbstract: '',
    technologies: [],
    pdf: null,
    githubLink: '',
    videoLink: '',
    images: [],
    name:''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter(item => item !== value)
      }));
    } else if (type === 'file') {
      if (name === 'pdf') {
        setFormData(prevState => ({ ...prevState, [name]: files[0] }));
      } else if (name === 'images') {
        setFormData(prevState => ({ ...prevState, [name]: Array.from(files) }));
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const uploadFile = async (file, type) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file: reader.result, type }),
          });
          const data = await response.json();
          if (response.ok) {
            resolve(data.url);
          } else {
            reject(new Error(data.error));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
    });
  };

  const uploadImages = async (images) => {
    const imageUrls = await Promise.all(images.map(file => uploadFile(file, 'image')));
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrls = await uploadImages(formData.images);
      let pdfUrl = null;
      if (formData.pdf) {
        pdfUrl = await uploadFile(formData.pdf, 'pdf');
      }

      const data = new FormData();
      data.append('projectName', formData.projectName);
      data.append('projectAim', formData.projectAim);
      data.append('departments', JSON.stringify(formData.departments));
      data.append('projectAbstract', formData.projectAbstract);
      data.append('technologies', JSON.stringify(formData.technologies));
      if (pdfUrl) {
        data.append('pdf', pdfUrl);
      }
      data.append('images', JSON.stringify(imageUrls));
      data.append('githubLink', formData.githubLink);
      data.append('videoLink', formData.videoLink);
      data.append('userEmail', user?.emailAddresses?.[0]?.emailAddress || '');
      data.append('userImage', user?.imageUrl || '');
      data.append('name',`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || '');


      const response = await fetch('/api/projects', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Project successfully submitted!');
        setFormData(initialFormData);
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    toast.info('Project submission cancelled.');
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-80 fixed inset-0 z-50 flex justify-center items-center">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="blur-overlay"></div>
          <img src="/loader.gif" alt="Loading..." className="w-20 h-20 z-60" />
        </div>
      )}
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-auto custom-scrollbar max-h-[90vh] ${isLoading ? 'blur-sm' : ''}`}>
        <h2 className=" mb-4 text-3xl">Project Entry Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Project Aim or Problem Statement</label>
            <textarea
              name="projectAim"
              value={formData.projectAim}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Department</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {departments.map(dept => (
                <label key={dept} className="flex items-center">
                  <input
                    type="checkbox"
                    name="departments"
                    value={dept}
                    checked={formData.departments.includes(dept)}
                    onChange={handleChange}
                    className="mr-2 cursor-pointer"
                  />
                  {dept}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Project Abstract</label>
            <textarea
              name="projectAbstract"
              value={formData.projectAbstract}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Technologies Used</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {technologies.map(tech => (
                <label key={tech} className="flex items-center">
                  <input
                    type="checkbox"
                    name="technologies"
                    value={tech}
                    checked={formData.technologies.includes(tech)}
                    onChange={handleChange}
                    className="mr-2 cursor-pointer"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">PDF</label>
            <input
              type="file"
              name="pdf"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              accept="application/pdf"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              multiple
              accept="image/*"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-2xl p-2">Video Link or Deployment Link</label>
            <input
              type="url"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCancel}
              className="bg-red-500 text-white mr-2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEntry;
