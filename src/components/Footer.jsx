const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <p className="text-red-900">&copy; 2024 AQ Meals. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-red-900 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-red-900 hover:text-gray-800">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
