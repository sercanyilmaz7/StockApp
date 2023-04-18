import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

//? iconların 3 değer alması lazım title-icon-url.map ile itere ederken alt itemlarda kullanmak için bana neler lazımsa objelerin içine onları koyduk.
//?  url neden tanımladık? çünk router da bu componentler stock altında nested oldukları ıcın to ="/stock/purchases/"  şeklinde adres verebiliriz.ana component "/stock" oldugu ıcın nestedlar "/stock/purchases" şeklinde gidiyor ki AppRouter da bu şekilde tanımladık.
const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
  {
    title: "Admin Panel",
    icon: <SupervisorAccountIcon />,
    url: "https://12176.fullstack.clarusway.com/admin",
  },
];

//? Burada yazılara ve iconlara CSS vermek istiyoruz.BU yüzden bir style objesi tanımladık ve iconStyle sx içinde ListİtemButton da verdik.
//? Bulunduğun yeri işaret etmek için & kullanıyorduk &:hover ise bukunduğun yerde hover da şunları yap diyebiliriz.hem yazı hemde iconun hover ın da CSS vermek için &:hover ve ıconun clasınıda ekleyerek &:hover .MuiSvgIcon-root yazıyoruz => bu şu demek hover oldugunda su class a color : red CSS sini ver.
//?  "& .MuiSvgIcon-root": { color: "white" } => içinde class ı .MuiSvgIcon-root olanına şunu yap.

const iconStyle = {
  color: "white",
  "& .MuiSvgIcon-root": { color: "white" },
  "&:hover": { color: "red" },
  "&:hover .MuiSvgIcon-root": { color: "red" },
};

//? Burada eklenır cıkarılır bır lıste yapmamız lazım. icon json ını burada itere ederek yazdırdık. tıklamayı hepsini kapsasın diye listitemButton a verdık.tıklandıgında navigate ile stock/products ..vb  olarak gidiyor.
//?  "Admin Panel" harici bir link olduğu için navigate ile direk url yi adres verdik. 
const MenuListItems = () => {
  // ? navigate bulunduğumuz yerin(ana adresin) üzerine adresi ekleyip gönderiyor.url leride bundan dolayı /stock/purhases olarak veridk. işte bu yüzden  de Admin Panel de sıkıntı oluyor.
  //? <ListItemButton> bir button elementi olduğu için to ile yönlendirme yapabiliriz.
  const navigate = useNavigate();
  return (
    <div>
      <List>
        {icons?.map((item, index) => (
          <ListItem key={index} disablePadding>
            {item.url.includes("http") && (
              <ListItemButton to={item.url} sx={iconStyle}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
            {!item.url.includes("http") && (
              <ListItemButton onClick={() => navigate(item.url)} sx={iconStyle}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;
//? navigate burada bulundugumuz yerın uzerıne yenı gelen http adresını eklemıs oluyor.Harici linkimiz oldugu ıcın bu hatayı veriyor. buda yanlış oluyor. Adminpanel için. koşul ile bunu öneleyebılırız. ilgili url http içeriyor mu diye bir koşul yapar ve buna göre yonlendırırız.içereni adminpanele içermeyeni stock/.... a yönlendiririz.
//? listitemButton bır button oldugu ıcın to özelliği var.to = { item.url} dersek gidebilir.
