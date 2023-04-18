import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductModal from "../components/modals/ProductModal";
import useStockCall from "../hooks/useStockCall";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyle";

const Products = () => {
  const { deleteStockData, getProCatBrand } = useStockCall();
  //? products ı store dan UseSelector ile çektik
  const { products } = useSelector((state) => state.stock);
  console.log(products)
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    category_id: "",
    brand_id: "",
    name: "",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const columns = [
    // ? başlıkların uzunluklarını statik değil flex:1 ,2,3 ile dinamik olarak veriyoruz.min-maxWidth vererek ayarlayabiliriz.
    {
      //? field backend den gelen adıdır.
      field: "id",
      //? table da görünen adıdır.
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      flex: 1,
      headerAlign: "center",
      align: "center",
      //? Bu özellik table üzerinde ilgili alana grelip tıklayarak table üzerinde değişiklik yapılmasını sağlıyor.
      // editable:"true"
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      flex: 3,
      minWidth: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 2,
    },

    {
      field: "stock",
      headerName: "Stock",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    {
      //? Backend de olmayan Extra olarak bölüm ekliyoruz.
      field: "actions",
      headerName: "Actions",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 50,
      flex: 1,
      //? mesela bir sütunda isim var yanında soyisim var başka bir sütunda da isim soyisim yapmak istiyorsunuz işte bunu yapmak için valueGetter fonksiyonu yapılabilir.
      //? params.row ile row daki verileri alıp işleyebiliyorsun (Jon Snow) gibi...
      //   valueGetter: (params) =>
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      //? renderCell de Hook kullanamayız bu yüzden bırcomponenet oluşturuyor onun içinde kullanıyor.
      //? action kısmında bir button olacak ve tıklandıgında silme işlemi olacak.
      //? renderCell fonksiyonu tanımlıyoruz.ve bir component döndürüyor.
      //? renderCell :(prarms) yazıyordu clg ile params a bakıyorız.
      renderCell: ({id}) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products",id)}
          //? bu şekilde params ın içine baktık ve id yi gördük . o zaman direk id yi burada desc yapabiliriz {id} yazabılırız ve kullanabiliriz.bu arada satır daki tüm bilgiler params ın içinde row da var.
          // onClick={() => console.log(params)}
        />
      ),
    },
  ];
// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];
  useEffect(() => {
    // getStockData("products")
    // getStockData("categories")
    // getStockData("brands")

    //! Promise All
    getProCatBrand();
  }, []); // eslint-disable-line

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      {/* //? table biz uygun bir height ve width veriyoruz. */}
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        {/* //? Bu bir component ve veriler table a yazılmıştır.içinde bir çok props yanıi özellik barındırıyor. */}
        <DataGrid
          //? height için bu özellik elemenrlere göre otomatik yükseklik veriyorç
          autoHeight
          //? row lar bize apiden gelecek olan product verileri.products ı store dan UseSelector ile çektik
          //? Buraya product yazınca hemen hata aldık . HATA null hatası state slice da ik değeri null yani "" olduğu için map liyemiyor ve hata veriyor.Bunu burada ? ile yapamayız çünkü tek veri var. burada bu hatayı şöyle düzeltebiliriz => (products || [] ) ya da  dirak kaynagından düzeltebiliriz.
          rows={products}
          //? column lar ise bizim tablemizin başlıkları ve statik olarak yazılıyor.
          columns={columns}
          //? table daki checkboxlar
          // checkboxSelection
          //? her bir sayfda kaç satır olacak onu ayarlayabiliyoruz.sitede ayrıntılı var.
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // pageSize={10}
          //? bir row un saıtırın seçimini engelliyor.
          disableRowSelectionOnClick
          //? table da sol üsttedki filter bölümü için  dökümandan filreting içine geliyoruz.
          //? columns içinde prductsı verdiğimiz için column da productsları çıkardı.
          slots={{ toolbar: GridToolbar }}
          sx={{
            boxShadow: 4,
          }}
        />
      </Box>
    </div>
  );
};

export default Products;

//?  https://mui.com/x/react-data-grid/
//? Table için MUI den data-grid yapısını aldık. siteden bak önce import ediyoruz
//? import  from '@mui/x-data-grid'; sonra buraya yapıştırıp düzeltmeler yapıyoruz.
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//? rows={products} yazarak verileri getirdik
//? params nedir? onClick içinde clg yap ve {id} yerine params yaz okut içini incele.!!!!
//? slots={{ toolbar: GridToolbar }} ekledik
//? product modal a gittik
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?
//?

//? MUI den basıc tabloyu aldık düzenliyoruz.
//? tabloda kı row yerıne produtc sı koyuyoruz. map içindeki  pro ları yazıyourz.
//?  sıra numarı ındex+1 ile oldu cunku 0 dan başlıyordu.
//? TableCellleri değiştirdik.
//? category kısmına geldik  get product bize ne veriyor backend den bakıyoruz.pro.category diyebilriz. brand e baktık yazdık.
//? tremor kutuphanesınden select box ı yapacagız multıselect yapacagız.
//?https://www.tremor.so/docs/components/select
//?
