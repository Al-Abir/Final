import BioData from "../components/BioData";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
           <div className="w-full h-full absolute">

           <Header />
           
          
           <main className="min-h-[80vh] mt-8">
              {children}
           </main>
      
          <Footer />
     

           </div>
              
        </>
    );
};

export default Layout;
