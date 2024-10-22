const Footer = () => {
  return (
    <footer className="py-8 mt-16 bg-cyan-900">
      <div className="container mx-auto px-6">
     <div className="flex justify-between items-center">
        <p className="text-yellow-200 font-thin">&copy; 2024 AQ Meals. All rights reserved.</p>
        <div className="flex space-x-4">            <a href="#" className="text-yellow-200 font-thin">Privacy Policy</a>
        <a href="#" className="text-yellow-200 font-thin">Terms of Service</a>
       </div>
    </div>
     </div>
 </footer>
  );
};

export default Footer;
