import { useReducer, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Heading, Flex, Button, Divider, Box, Center } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import PrivatePage from "../../components/Layout/PrivatePage";
import { COLOR_THEME } from "../../util/constants";
import ExpenseModal from "./ExpenseModal";
import {
  createExpenseMutation,
  deleteExpenseMutation,
  updateExpenseMutation,
} from "../../mutations";
import { expensesQuery } from "../../queries";

function expenseModalReducer(state, action) {
  switch (action.type) {
    case "OPEN_ADD_EXPENSE_MODAL":
      return {
        isOpen: true,
        description: "",
        amount: "",
        type: action.expenseType,
      };
    case "OPEN_EDIT_EXPENSE_MODAL":
      return { ...action.expense, isOpen: true };
    case "DISMISS_EXPENSE_MODAL": {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
}

const ExpensesPage = () => {
  const [expense, expenseModalDispatch] = useReducer(expenseModalReducer, {
    description: "",
    amount: "",
  });
  const [createExpense] = useMutation(createExpenseMutation);
  const [updateExpense] = useMutation(updateExpenseMutation);
  const [deleteExpense] = useMutation(deleteExpenseMutation);
  const { data } = useQuery(expensesQuery, {
    fetchPolicy: "no-cache",
  });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setExpenses(data.expenses || []);
    }
  }, [data]);

  const handleAddExpenseClick = (expenseType) => {
    expenseModalDispatch({ type: "OPEN_ADD_EXPENSE_MODAL", expenseType });
  };

  const handleExpenseClick = (item) => {
    expenseModalDispatch({ type: "OPEN_EDIT_EXPENSE_MODAL", expense: item });
  };

  const handleExpenseModalDismiss = () => {
    expenseModalDispatch({ type: "DISMISS_EXPENSE_MODAL" });
  };

  const handleSubmit = async ({ description, amount }) => {
    if (expense._id) {
      try {
        const {
          data: { updateExpense: updatedExpense },
        } = await updateExpense({
          variables: {
            id: expense._id,
            description,
            amount: Number(amount),
          },
        });
        if (updatedExpense && updatedExpense._id) {
          setExpenses(
            expenses.map((prevExpense) => ({
              ...prevExpense,
              description:
                prevExpense._id === updatedExpense._id
                  ? updatedExpense.description
                  : prevExpense.description,
              amount:
                prevExpense._id === updatedExpense._id
                  ? updatedExpense.amount
                  : prevExpense.amount,
            }))
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      const { type } = expense;
      try {
        const {
          data: { createExpense: newExpense },
        } = await createExpense({
          variables: {
            type,
            description,
            amount: Number(amount),
          },
        });
        if (newExpense && newExpense._id) {
          setExpenses([newExpense, ...expenses]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    handleExpenseModalDismiss();
  };

  const handleDelete = async (id) => {
    try {
      const {
        data: { deleteExpense: deleteExpenseRes },
      } = await deleteExpense({
        variables: {
          id,
        },
      });
      if (deleteExpenseRes.result) {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderTotal = (type) => {
    if (!(expenses && expenses.length)) return "0";
    const items = expenses.filter((expense) => expense.type === type);
    if (items.length) {
      const total = items.reduce((a, b) => (a.amount || a) + b.amount);
      const num = total.amount ? total.amount : total;
      return Math.round(num * 100) / 100;
    }
    return "0";
  };

  const renderSection = (type) => {
    return (
      <Flex flex="1" direction="column" alignItems="center">
        <Heading as="h1" mb="2" textTransform="uppercase">
          {type}
        </Heading>
        <Heading as="h1" mb="2">
          ${renderTotal(type)}
        </Heading>
        <Button
          my="2"
          backgroundColor={`${COLOR_THEME}.500`}
          color="white"
          onClick={() => handleAddExpenseClick(type)}
        >
          Add EXPENSE
        </Button>
        <Divider orientation="horizontal" my="2" />
        {expenses
          .filter((expense) => expense.type === type)
          .map((expense) => (
            <Flex
              key={expense._id}
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              mb="2"
            >
              <Box onClick={() => handleExpenseClick(expense)}>
                {expense.description}: ${expense.amount}
              </Box>
              <Flex width="12" justifyContent="space-between">
                <EditIcon
                  onClick={() => handleExpenseClick(expense)}
                  fontSize="lg"
                  cursor="pointer"
                  color={`${COLOR_THEME}.500`}
                />
                <DeleteIcon
                  onClick={() => handleDelete(expense._id)}
                  fontSize="lg"
                  color="red.500"
                  cursor="pointer"
                />
              </Flex>
            </Flex>
          ))}
      </Flex>
    );
  };

  return (
    <PrivatePage>
      <Flex p="4">
        {renderSection("life")}
        <Center>
          <Divider orientation="vertical" mx="2" />
        </Center>
        {renderSection("business")}
      </Flex>
      <ExpenseModal
        {...expense}
        handleDismiss={handleExpenseModalDismiss}
        handleSubmit={handleSubmit}
      />
    </PrivatePage>
  );
};

ExpensesPage.routeName = "/expenses";

export default ExpensesPage;
