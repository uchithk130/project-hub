// mutations.js
import { gql } from 'graphql-request';

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProjectHUB(
    $projectName: String!
    $projectAim: String!
    $departments: [Department!]
    $projectAbstract: String!
    $technologies: [Technology!]
    $pdf: AssetCreateOneInlineInput!
    $githubLink: String
    $videoLink: String
    $images: [AssetWhereUniqueInput!]
    // $userEmail: String!
  ) {
    createProject(data: {
      projectName: $projectName
      projectAim: $projectAim
      departments: { set: $departments }
      projectAbstract: $projectAbstract
      technologies: { set: $technologies }
      pdf: $pdf
      githubLink: $githubLink
      videoLink: $videoLink
      images: { connect: $images }
      // userEmail: $userEmail
    }) {
      id
    }
  }
`;

