import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuListItems from "../components/MenuListItems";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import { Outlet } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";

const drawerWidth = 200;

function Dashboard(props) {
  const { currentUser } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuListItems />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stock App
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // ? backGround color vermek için MUI den colorlardan birini import edip buraya verebiiriz.Burada color=white yazarsak sadece yazıları beyaz yapar.çünkü iconları harici yerde MenelistItem da bastık. onlara ulaşamıyoruz.
              backgroundColor: blueGrey[900],
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: blueGrey[900],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;

//? MUI den Drawer componenetini buraya indirdik. Dashboard da hem navbar hem sol-yan menu hemde hemde içerikler var.DashBoard bizim genel componentimiz. hepsini bir arada burada bulunduruyor.burasının ana adresi stock diye geçiyor. buradan biz sol yandakı listeden seçilen componenetlere geçiyoruz.

//? <Divider> in altındaki List bölümünü aldık yeni harici bircomponent oluşturduk (MenuList) onun içine yapıştırdık.oluşan yeni Menülist componentinide burada List in yerine koyduk.Burası sol yanda açılan listelerin olduğu menü.

//? refresh yaptıgımızda logın sayfasına donuyoruz. Cunku current user ınıtıal degerı null oldugu ıcın her refresh te currentuserdan dolayı logın e gonderıyor.Çünkü stateler ister ContextAPI stete i olsun ister REDUX state i olsun geçici bellekte (ram da) tutulurlar.Stateleri kalıcı hale getirmek ve her seferinde oradan okumak lazım.Biz burada Local veya Session storage ile yapacağız.Biz PERSİST ile yapacağız.currentUser varsa uygulama içinde kalabılıyoruz. PrivateRouter da biz böyle tanımlamıştık.

//? AppBar=>ToolBar içinde  Stockapp i yazdırdık sonra currentUser varsa görünsün koşulu ile LOGOUT Button u aldık (flex grow 1 olunca buyume oranı 1 oluyor. diğeri geri kalan alanı kapsıyor.)
//?currentUser ı store den import ettık
//? UseAuthCall dan logout fonksiyonunu import ettık
//? şimdi Routelara geçiyruz.

//? Dashboard un altında sayfaları var. o yuzden nested yapıyoruz.Yani sol-yan menudeki listelendmiş linklere navigate sayesinde ilgili componente gidiyoruz. Ama tüm componenetlere buradan DashBoard üzerinden yani stock sayfası üzerinden geçiyoruz.Böylece sol-yan menüden gidilen componenetler stock yanı Dasborad ın altında nested componenetler oluyor.Router da bu componentleri nested olarak tanımlamamız gerekiyor.Burada dashboard aslında Stock sayfası olarak ana sayfa gıbı lınklar de alt sayfalar nestedlar gıbı oluyor.

//! OUTLET önemli nestedlar orada olmalılar.Çünkü MEnüListeki linkelere tıklayınca gelen componentler nessted oldukları için OUTLET i koyduğumuz yerde gelecekler.


//? 
