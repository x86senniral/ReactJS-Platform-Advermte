
const FooterSet = () => {
  return (
   <>
   <footer className="bg-gray-800 text-white text-center p-4 inset-x-0 bottom-0 mt-20">
      <div className="mx-auto px-6">
        <div className="flex justify-center items-center">
          <div className="py-2">
            <p className="text-sm md:text-base">
              &copy; {new Date().getFullYear()} Advermte. All rights reserved.
            </p>
            <p className="text-xs md:text-sm">
              Terms of Service | Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default FooterSet