import { RiInstagramLine } from "react-icons/ri";
import { RiYoutubeFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className="w-screen px-8 pb-8">
      <div className="w-full bg-fblue-700 rounded-xl flex flex-col items-center p-8 ">
        <img
          src="/logo/icon.png"
          alt="Logo fractal"
          className="w-1/2 md:w-32"
        />
        <div className="md:flex md:flex-row md:justify-around md:w-full">
          <div className="flex flex-col items-center mt-10 text-fgray-200 gap-3">
            <h4 className="text-2xl font-semibold mb-3 md:text-left md:w-full">About us</h4>
            <a href="#" className="underline text-lg md:text-left md:w-full">Our Mission</a>
            <a href="#" className="underline text-lg md:text-left md:w-full">Team</a>
            <a href="#" className="underline text-lg md:text-left md:w-full">Newsletter</a>
          </div>
          <div className="flex flex-col items-center mt-10 text-fgray-200 gap-3">
            <h4 className="text-2xl font-semibold mb-3 md:text-left md:w-full">Legal</h4>
            <a href="#" className="underline text-lg md:text-left md:w-full">Terms and conditions</a>
            <a href="#" className="underline text-lg md:text-left md:w-full">Privacy politics</a>
          </div>
        </div>
        <div className="flex w-full items-center flex-row justify-center gap-6 mt-14 text-3xl text-fgray-200">
            <RiInstagramLine/>
            <RiYoutubeFill/>
            <RiFacebookCircleFill/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
