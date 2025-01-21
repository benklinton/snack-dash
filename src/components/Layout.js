import Navbar from './Navbar';

const RootLayout = ({ children }) => {
    return (
        <>
        <Navbar />
        <main>{children}</main>
        </>
    );
    }

export default RootLayout;