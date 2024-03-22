import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Select,
  Spacer,
  FormControl,
  Box,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  Button,
  useToast,
  flattenTokens,
} from "@chakra-ui/react";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
let n = 0;
let pointN;
function Tujuan({ props }) {
  const { tujuan, setTujuan, kelas, setKelas, setPilih } = props;
  let tujuanObj = [
    {
      id: 1,
      tujuan: "Bali",
      kelas: {
        ekonomi: 3_000_000,
        busines: 6_000_000,
        eksekutif: 10_000_000,
      },
    },
    {
      id: 2,
      tujuan: "Medan",
      kelas: {
        ekonomi: 1_000_000,
        busines: 3_000_000,
        eksekutif: 7_000_000,
      },
    },
    {
      id: 3,
      tujuan: "Papua",
      kelas: {
        ekonomi: 6_000_000,
        busines: 12_000_000,
        eksekutif: 16_000_000,
      },
    },
    {
      id: 4,
      tujuan: "jakarta",
      kelas: {
        ekonomi: 1_000_000,
        busines: 3_000_000,
        eksekutif: 6_000_000,
      },
    },
    {
      id: 5,
      tujuan: "Singapura",
      kelas: {
        ekonomi: 10_000_000,
        busines: 15_000_000,
        eksekutif: 21_000_000,
      },
    },
  ];

  function handleTujuan(event) {
    setTujuan(event.target.value);
    setPilih({
      ekonomi: "",
      busines: "",
      eksekutif: "",
      pilihan: "",
    });
    if (!event.target.value)
      setKelas({
        ekonomi: 0,
        busines: 0,
        eksekutif: 0,
      });
    else
      tujuanObj.forEach((element) => {
        if (element.tujuan == event.target.value)
          setKelas({
            ekonomi: element.kelas.ekonomi,
            busines: element.kelas.busines,
            eksekutif: element.kelas.eksekutif,
          });
      });
  }

  return (
    <>
      <Select
        variant={"flushed"}
        name="tujuan"
        id="tujuan"
        placeholder="Tujuan"
        value={tujuan}
        onChange={handleTujuan}
      >
        {tujuanObj.map((e, re) => (
          <option
            key={e.id}
            style={{ backgroundColor: "blue", color: "white" }}
            value={e.tujuan}
          >
            {e.tujuan}
          </option>
        ))}
      </Select>
    </>
  );
}

function Kelas({ props }) {
  const { pilih, setPilih, kelas, setKelas } = props;

  const Rp = (duit) => {
    const rp = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(duit);
    return rp;
  };

  return (
    <>
      <h4 align="center">Pilih Kelas</h4>
      <div className="kelas">
        <div
          style={{ border: pilih.ekonomi }}
          onClick={() => {
            setPilih({
              ekonomi: "1.8px solid white",
              busines: "",
              eksekutif: "",
              pilihan: "ekonomi",
              harga: kelas.ekonomi,
            });
          }}
        >
          <p>Ekonomi</p>
          <small>{Rp(kelas.ekonomi)}</small>
        </div>
        <div
          style={{ border: pilih.busines }}
          onClick={() => {
            setPilih({
              ekonomi: "",
              busines: "1.8px solid white",
              eksekutif: "",
              pilihan: "busines",
              harga: kelas.busines,
            });
          }}
        >
          <p>Busines</p>
          <small>{Rp(kelas.busines)}</small>
        </div>
        <div
          style={{ border: pilih.eksekutif }}
          onClick={() => {
            setPilih({
              ekonomi: "",
              busines: "",
              eksekutif: "1.8px solid white",
              pilihan: "eksekutif",
              harga: kelas.eksekutif,
            });
          }}
        >
          <p>Eksekutif</p>
          <small>{Rp(kelas.eksekutif)}</small>
        </div>
      </div>
    </>
  );
}

function Coba({ props }) {
  const { bill, setBill } = props;
  const [pilih, setPilih] = useState({
    ekonomi: "",
    busines: "",
    eksekutif: "",
    pilihan: "",
    harga: 0,
  });
  const [tujuan, setTujuan] = useState("");
  const [kelas, setKelas] = useState({
    ekonomi: 0,
    busines: 0,
    eksekutif: 0,
  });
  const [diskon, setDiskon] = useState({
    strDiskon: "",
    diskon: 1,
    msgKondisi: "",
  });

  const componentToast = useToast();
  function toastDiskon(data) {
    const { diskon = "", codeDiskon = "" } = data;
    if (n === 1) {
      if (pointN == true) {
        componentToast({
          position: "top",
          title: `Mendapatkan Diskon ${diskon * 100}%`,
          description: `code : ${codeDiskon}`,
          status: "success",
          isClosable: true,
        });
        pointN = false;
      }
      n = 2;
      return;
    }

    if (n === 2) {
      pointN = true;
      componentToast({
        position: "top",
        title: `Tidak ada Diskon`,
        description: `code : ${codeDiskon}`,
        status: "warning",
        isClosable: true,
        duration: 1400,
      });
      n = 3;
    }
  }

  const handleDiskon = (event) => {
    const thisValue = event.target.value.trim();
    if (!thisValue) {
      setDiskon({
        strDiskon: thisValue,
        diskon: 1,
        msgKondisi: "",
      });
      return;
    }

    if (thisValue.length > 16) {
      setDiskon({
        strDiskon: diskon.strDiskon,
        diskon: 1,
        msgKondisi: "(nothing Diskon)",
      });
      return;
    }
    switch (thisValue) {
      case "orang_dalem":
        setDiskon({
          strDiskon: thisValue,
          diskon: 0.5,
          msgKondisi: "(succes Diskon)",
        });

        break;
      case "1234":
        setDiskon({
          strDiskon: thisValue,
          diskon: 0.08,
          msgKondisi: "(succes Diskon)",
        });

        break;
      case "pkAlfin":
        setDiskon({
          strDiskon: thisValue,
          diskon: 0.95,
          msgKondisi: "(!big Diskon!)",
        });

        break;
      case "keyshaloveakbar":
        setDiskon({
          strDiskon: thisValue,
          diskon: 0.99,
          msgKondisi: "(!big Diskon!)",
        });

        break;
      case "keyshacantik":
        setDiskon({
          strDiskon: thisValue,
          diskon: 0.99,
          msgKondisi: "(!big Diskon!)",
        });

        break;

      default:
        setDiskon({
          strDiskon: thisValue,
          diskon: 1,
          msgKondisi: "(nothing Diskon)",
        });

        break;
    }
  };

  if (diskon.diskon != 1) {
    n = 1;
    toastDiskon({
      diskon: diskon.diskon,
      codeDiskon: diskon.strDiskon,
    });
  } else {
    if (n === 0) {
      if (diskon.strDiskon.length == 2) {
        n = 2;
      }
    }
    toastDiskon({
      diskon: "",
      codeDiskon: diskon.strDiskon,
    });
  }

  const [jumlah, setJumlah] = useState(0);
  const [nama, setNama] = useState("");

  const handleInputNama = (event) => {
    setNama(event.target.value);
  };
  const handleJumlah = (event) => {
    const thisValue = event.split("e").join("").split("-").join("");
    thisValue > 50
      ? setJumlah(50)
      : thisValue < 0
      ? setJumlah(0)
      : setJumlah(thisValue);
  };

  function ComponentBtn() {
    return (
      <Box>
        <Flex>
          <Spacer />
          <Button
            className="anm"
            justifyItems={"center"}
            colorScheme="teal"
            size={"sm"}
            onClick={(e) => {
              n = 0;
              setBill({
                nama: nama,
                tujuan: tujuan,
                kelas: pilih.pilihan,
                harga: pilih.harga,
                jumlah: jumlah,
                diskonStr: diskon.strDiskon,
                diskon: diskon.diskon,
              });
            }}
          >
            <Link to={"/bill"}>Check</Link>
          </Button>
        </Flex>
      </Box>
    );
  }
  useEffect((e) => {
    document.body.style.setProperty("background-color", "#1A365D");
  });
  return (
    <>
      <Container
        maxW={"8xl"}
        overflow={"hidden"}
        bg={"blue.900"}
        color={"white"}
      >
        <h1 align="center" style={{ fontSize: "29px" }}>
          Pesan Tiket Pesawat
        </h1>
        <hr />
        <br />
        <Flex direction={{ base: "column", md: "row" }}>
          <Spacer />
          <Box px={2}>
            <p>Nama</p>
            <Input
              id="nama"
              m={0}
              value={nama}
              onChange={handleInputNama}
              variant="flushed"
              placeholder=" Masukan Nama "
              size={"sm"}
            />
          </Box>
          <Box p={2} py={{ base: 1, md: 4 }}>
            <Tujuan
              props={{
                tujuan: tujuan,
                setTujuan: setTujuan,
                kelas: kelas,
                setKelas,
                setPilih: setPilih,
              }}
            />
          </Box>
          <Box px={2} pt={{ base: 2, md: 0 }}>
            <p>Jumlah</p>

            <NumberInput
              size="md"
              max={50}
              min={0}
              value={jumlah}
              onChange={(e) => handleJumlah(e)}
            >
              <NumberInputField focusBorderColor="red.200" />
              <NumberInputStepper>
                <NumberIncrementStepper
                  bg="green.200"
                  _active={{ bg: "green.300" }}
                  children="+"
                />
                <NumberDecrementStepper
                  bg="pink.200"
                  _active={{ bg: "pink.300" }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Spacer />

          <Box px={2} pt={{ base: 3, md: 1 }}>
            <p>Diskon</p>
            <Input
              m={0}
              variant={"flushed"}
              placeholder=" kode Diskon"
              size={"sm"}
              value={diskon.strDiskon}
              onChange={handleDiskon}
            />
          </Box>
          <Spacer />
        </Flex>

        <Flex py={5} direction={{ base: "column", md: "row" }}>
          <Box width={"100%"}>
            <Kelas
              props={{
                pilih: pilih,
                setPilih: setPilih,
                kelas: kelas,
                setKelas: setKelas,
              }}
            />
          </Box>
          <Spacer />
          <Box width={"100%"} pt={{ base: 5, md: 0 }}>
            <Flex>
              <Box
                style={{ transition: "2s" }}
                bg={"gray.200"}
                p={2}
                shadow={"lg"}
                width={{ base: "100%", md: "400px" }}
                borderRadius={"md"}
              >
                <Text
                  fontSize={"3xl"}
                  align={"center"}
                  borderBottom={"1px solid gray"}
                  color={"black"}
                >
                  Infoice
                </Text>
                <pre style={{ color: "black" }}>
                  <Text>Nama . . . : {nama}</Text>
                  <Text>Tujuan . . : {tujuan}</Text>
                  <Text>Jumlah . . : {jumlah}</Text>
                  <Text>Kelas . . .: {pilih.pilihan}</Text>
                  <Text>
                    Diskon . . : {diskon.strDiskon}
                    {diskon.msgKondisi}
                  </Text>
                </pre>
                {nama != "" &&
                tujuan != "" &&
                jumlah != 0 &&
                jumlah != "" &&
                pilih.pilihan != "" ? (
                  <ComponentBtn />
                ) : (
                  ""
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
export default Coba;
