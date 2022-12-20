import "https://unpkg.com/navigo";
import { adjustForMissingHash, loadHtml, renderTemplate, setActiveLink } from "./utils.js";
import { initAllProducts } from "./pages/allProducts/allProducts.js";
import { initAddProduct } from "./pages/addProduct/addproduct.js";
import { initfindEditProduct } from "./pages/findEditProduct/findEditProduct.js";
import { initAllDeliveries } from "./pages/allDeliveries/alldeliveries.js";
import { initCreateDelivery } from "./pages/createDelivery/createDelivery.js";
import { initFindDelivery } from "./pages/findDelivery/findDelivery.js";

window.addEventListener("load", async () => {
    const templateHome = await loadHtml("./pages/home/home.html");
    const templateNotFound = await loadHtml("./pages/notFound/notFound.html");
    const templateAllProducts = await loadHtml("./pages/allProducts/allProducts.html")
    const templateAddProduct = await loadHtml("./pages/addProduct/addProduct.html")
    const templateFindEditProduct = await loadHtml("./pages/findEditProduct/findEditProduct.html")
    const templateAllDeliveries = await loadHtml("./pages/allDeliveries/allDeliveries.html")
    const templateCreateDelivery = await loadHtml("./pages/createDelivery/createDelivery.html")
    const templateFindDelivery = await loadHtml("./pages/findDelivery/findDelivery.html")

    adjustForMissingHash();

    const router = new Navigo("/", { hash: true });
    window.router = router;

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url);
                done();
            },
        })
        .on({
            "/": () => {
                renderTemplate(templateHome, "content");
            },            
        })
        .on({
            "/allProducts": () => {
                renderTemplate(templateAllProducts, "content");
                initAllProducts();
            },            
        })
        .on({
            "/addProduct": () => {
                renderTemplate(templateAddProduct, "content");
                initAddProduct();
            },            
        })
        .on({
            "/findEditProduct": () => {
                renderTemplate(templateFindEditProduct, "content");
                initfindEditProduct();
            },            
        })
        .on({
            "/allDeliveries": () => {
                renderTemplate(templateAllDeliveries, "content");
                initAllDeliveries();
            },            
        })
        .on({
            "/createDelivery": () => {
                renderTemplate(templateCreateDelivery, "content");
                initCreateDelivery();
            },            
        })
        .on({
            "/findDelivery": () => {
                renderTemplate(templateFindDelivery, "content");
                initFindDelivery();
            },            
        })
        .notFound(() => {
            renderTemplate(templateNotFound, "content");
        })
        .resolve();
});
