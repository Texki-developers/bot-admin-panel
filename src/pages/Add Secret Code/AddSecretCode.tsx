import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable";
import FormModal from "../../components/Modal/FormModal/FormModal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import AlertDialogRemoval from "../../components/AlertDialog/AlertDialogRemoval";
import useCustomToast from "../../hooks/useCustomToast/useCustomToast";
import SecretCodeForm from "../../components/Forms/SecretCodeForm/SecretCodeForm";
import {
  deleteSecretCode,
  getSecretCode,
} from "../../features/manageSecretCode/manageSecretCode.action";
import { ISecretCodeBody } from "../../types/components/Forms/form.type";
import { resetSecret } from "../../features/manageSecretCode/manageSecretCode.slice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddSecretCode() {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const formDisclosure = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [reRender, setReRender] = useState(0);

  const { data, status, message } = useAppSelector((state) => state?.secret);

  console.log(BASE_URL, "this is base URL");

  const columns: TableColumn<ISecretCodeBody>[] = [
    {
      name: "Secret Code",
      selector: (row: ISecretCodeBody) => row.secretToken,
    },
    {
      name: "Redeem Count",
      selector: (row: ISecretCodeBody) => row.userLimit,
    },
    {
      name: "Valid Upto",
      selector: (row: ISecretCodeBody) =>
        moment(row.expiryTime).format("DD-MM-yyyy hh:mm A"),
    },
    {
      name: "Delete",
      cell: (row: ISecretCodeBody) => (
        <IconButton
          icon={<MdDelete />}
          aria-label="delete row"
          colorScheme="red"
          onClick={() => {
            setShowAlert(true);
            setDeleteId(row._id as string);
          }}
        />
      ),
    },
  ];

  const handleDeletion = async () => {
    const response = await dispatch(
      deleteSecretCode({ id: deleteId as string })
    );
    if (response.meta.requestStatus === "fulfilled") {
      toast("Deleted", "Delete successfully", "success");
      setReRender((prev) => prev + 1);
    } else {
      toast("Ugh no!", message as string, "error");
    }

    dispatch(resetSecret());
    setShowAlert(false);
  };

  useEffect(() => {
    dispatch(getSecretCode());
  }, [reRender]);

  return (
    <Box>
      <AlertDialogRemoval
        title="Are you Sure ?"
        isOpen={showAlert}
        body="Do you want to delete the Image from gallery?"
        onClose={() => setShowAlert(false)}
        onProceed={handleDeletion}
      />
      <FormModal
        isOpen={formDisclosure.isOpen}
        onClose={formDisclosure.onClose}
        title="Add Secret Code"
      >
        <SecretCodeForm
          onClose={formDisclosure.onClose}
          setReRender={setReRender}
        />
      </FormModal>
      {status === "loading" ? (
        <Center>Loading....</Center>
      ) : (
        <VStack alignItems="flex-start">
          <Heading variant="sectionHeading">Gallery</Heading>
          <Flex justifyContent="flex-end" w="100%">
            <AddButton onClick={() => formDisclosure.onOpen()}>
              Add New
            </AddButton>
          </Flex>
          <CustomDataTable
            columns={columns}
            data={data || []}
            selectableRows={false}
            pagination={false}
          />

          {/* <HStack justifyContent="center" w="100%">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageChange}
              pageCount={Math.ceil(totalCount / 10)}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              activeClassName={"active"}
              activeLinkClassName="active"
            />
          </HStack> */}
        </VStack>
      )}
    </Box>
  );
}
