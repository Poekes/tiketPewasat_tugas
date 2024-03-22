import { Link } from "react-router-dom";
// import axios from "axios";
import {
  Container,
  Button,
  Flex,
  Box,
  Spacer,
  Heading,
  useToast,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableCaption,
} from "@chakra-ui/react";
function About({ props }) {
  const { bill, setBill } = props;

  if (bill.nama == "" && bill.tujuan == "" && bill.kelas == "") {
    window.location.href = window.location.origin;
  }

  async function get() {
    console.log("this get axios");
    // const data = await axios("http://127.0.0.1:8000/api/coba");
    // const res = await data.data.body;
    // console.log(res);
  }

  function toRp(duit) {
    let result = new Intl.NumberFormat("id-ID", {
      currency: "IDR",
    }).format(duit);
    return result;
  }

  const toast = useToast();
  return (
    <>
      <Container maxW={"8xl"} bg={"blue.900"} height={"100dvh"} id="container">
        <Heading p={2} color={"gray.300"} size={{ base: "xl", md: "2xl" }}>
          Checked
        </Heading>
        <TableContainer
          m={"auto"}
          w={{ base: "230px", md: "400px" }}
          bg={"gray.200"}
          rounded={"md"}
          shadow={"xl"}
        >
          <Table
            size={{ base: "sm", md: "md" }}
            variant="simple"
            color={"gray.900"}
          >
            <TableCaption>
              <Button
                as={"button"}
                size={"sm"}
                color={"white"}
                variant={"green"}
                bgGradient={"linear(to-r, green.300, green.400)"}
                shadow={"md"}
              >
                <Link
                  onClick={(e) => {
                    toast({
                      position: "top-right",
                      title: "Terimakasih",
                      status: "success",
                      duration: 5000,
                    });
                  }}
                  to={"/"}
                >
                  Confirm
                </Link>
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Td>Name</Td>
                <Td>: {bill.nama}</Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Tujuan</Td>
                <Td>: {bill.tujuan}</Td>
              </Tr>
              <Tr>
                <Td>Kelas</Td>
                <Td>: {bill.kelas}</Td>
              </Tr>
              <Tr>
                <Td>Harga </Td>
                <Td>: Rp {toRp(bill.harga)}</Td>
              </Tr>
              <Tr>
                <Td>Tiket</Td>
                <Td>: {bill.jumlah}</Td>
              </Tr>

              <Tr>
                <Td>Sub Total</Td>
                <Td>: Rp {toRp(bill.jumlah * bill.harga)}</Td>
              </Tr>
              {bill.diskon !== 1 ? (
                <>
                  <Tr>
                    <Td>Diskon</Td>
                    <Td>: {bill.diskon * 100}%</Td>
                  </Tr>
                  <Tr>
                    <Td>Potongan</Td>
                    <Td>: Rp {toRp(bill.harga * bill.jumlah * bill.diskon)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Sub Diskon</Td>
                    <Td>
                      : Rp{" "}
                      {toRp(
                        bill.harga * bill.jumlah -
                          bill.harga * bill.jumlah * bill.diskon
                      )}
                    </Td>
                  </Tr>
                </>
              ) : (
                ""
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default About;
