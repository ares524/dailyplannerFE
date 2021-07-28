import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
      role
      error
    }
  }
`;

export const registerMutation = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      email
      role
      error
    }
  }
`;

export const checkOrCreateSheetMutation = gql`
  mutation ($day: String!) {
    checkOrCreateSheet(day: $day) {
      id
    }
  }
`;

export const addDayMutation = gql`
  mutation ($date: Date!) {
    addDay(date: $date) {
      date
      createdAt
    }
  }
`;

export const updateSheetMutation = gql`
  mutation (
    $id: ID!
    $gratefulFor: String
    $affirmation: String
    $callSos: String
    $research: String
    $reading: ReadingInputType
    $accountability: AccountabilityInputType
    $awake: String
    $asleep: String
  ) {
    updateSheet(
      id: $id
      gratefulFor: $gratefulFor
      affirmation: $affirmation
      callSos: $callSos
      research: $research
      reading: $reading
      accountability: $accountability
      awake: $awake
      asleep: $asleep
    ) {
      id
    }
  }
`;

export const updateJournalMutation = gql`
  mutation ($id: ID!) {
    updateSheet(id: $id) {
      id
    }
  }
`;

export const createTodoItemMutation = gql`
  mutation (
    $id: ID
    $sheetId: ID!
    $type: String
    $title: String
    $actions: [TodoActionInputType]!
  ) {
    createTodoItem(
      id: $id
      sheetId: $sheetId
      type: $type
      title: $title
      actions: $actions
    ) {
      _id
      sheetId
      items {
        _id
        title
        completed
      }
      type
      startTime
      endTime
    }
  }
`;

export const updateTodoItemMutation = gql`
  mutation ($id: ID!, $title: String!, $actions: [TodoActionInputType]!) {
    updateTodoItem(id: $id, title: $title, actions: $actions) {
      _id
      title
      completed
    }
  }
`;

export const toggleTodoItemCompletedMutation = gql`
  mutation ($id: ID!) {
    toggleTodoItemCompleted(id: $id) {
      result
    }
  }
`;

export const deleteTodoItemMutation = gql`
  mutation ($id: ID!) {
    deleteTodoItem(id: $id) {
      result
    }
  }
`;

export const updateTodoOptionsMutation = gql`
  mutation ($id: ID!, $startTime: String, $endTime: String) {
    updateTodoOptions(id: $id, startTime: $startTime, endTime: $endTime) {
      _id
    }
  }
`;

export const createExpenseMutation = gql`
  mutation ($type: String!, $description: String!, $amount: Float!) {
    createExpense(type: $type, description: $description, amount: $amount) {
      _id
      type
      amount
      description
    }
  }
`;

export const updateExpenseMutation = gql`
  mutation ($id: ID!, $description: String, $amount: Float) {
    updateExpense(id: $id, description: $description, amount: $amount) {
      _id
      type
      amount
      description
    }
  }
`;

export const deleteExpenseMutation = gql`
  mutation ($id: ID!) {
    deleteExpense(id: $id) {
      result
    }
  }
`;

// export const createThoughtItemMutation = gql`
//   mutation (
//     $id: ID
//     $sheetId: ID!
//     $type: String
//     $title: String
//     $actions: [ThoughtActionInputType]!
//   ) {
//     createThoughtItem(
//       id: $id
//       sheetId: $sheetId
//       type: $type
//       title: $title
//       actions: $actions
//     ) {
//       _id
//       sheetId
//       items {
//         _id
//         title
//         completed
//       }
//       type
//       startTime
//       endTime
//     }
//   }
// `;

// export const updateThoughtItemMutation = gql`
//   mutation ($id: ID!, $title: String!, $actions: [ThoughtActionInputType]!) {
//     updateThoughtItem(id: $id, title: $title, actions: $actions) {
//       _id
//       title
//       completed
//     }
//   }
// `;

// export const toggleThoughtItemCompletedMutation = gql`
//   mutation ($id: ID!) {
//     toggleThoughtItemCompleted(id: $id) {
//       result
//     }
//   }
// `;

// export const deleteThoughtItemMutation = gql`
//   mutation ($id: ID!) {
//     deleteThoughtItem(id: $id) {
//       result
//     }
//   }
// `;

// export const updateThoughtOptionsMutation = gql`
//   mutation ($id: ID!, $startTime: String, $endTime: String) {
//     updateThoughtOptions(id: $id, startTime: $startTime, endTime: $endTime) {
//       _id
//     }
//   }
// `;

export const createThoughtItemMutation = gql`
  mutation (
    $id: ID
    $type: String
    $title: String
    $actions: [ThoughtActionInputType]!
  ) {
    createThoughtItem(id: $id, type: $type, title: $title, actions: $actions) {
      _id
      items {
        _id
        title
        completed
      }
      type
      startTime
      endTime
    }
  }
`;

export const updateThoughtItemMutation = gql`
  mutation ($id: ID!, $title: String!, $actions: [ThoughtActionInputType]!) {
    updateThoughtItem(id: $id, title: $title, actions: $actions) {
      _id
      title
      completed
    }
  }
`;

export const toggleThoughtItemCompletedMutation = gql`
  mutation ($id: ID!) {
    toggleThoughtItemCompleted(id: $id) {
      result
    }
  }
`;

export const deleteThoughtItemMutation = gql`
  mutation ($id: ID!) {
    deleteThoughtItem(id: $id) {
      result
    }
  }
`;

export const updateThoughtOptionsMutation = gql`
  mutation ($id: ID!, $startTime: String, $endTime: String) {
    updateThoughtOptions(id: $id, startTime: $startTime, endTime: $endTime) {
      _id
    }
  }
`;

export const getAllThoughtsMutation = gql`
  mutation ($id: ID!) {
    getAllThoughts(id: $id) {
      _id
    }
  }
`;
