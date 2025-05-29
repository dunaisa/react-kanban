import './MainLayout.css'

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='main'>
      {children}
    </div>
  );
};

export default MainLayout;
