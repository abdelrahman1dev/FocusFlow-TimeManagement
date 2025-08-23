import App from "./App";

export default function Home() {
  return (
    <><div
      className="bg-gray-100 flex flex-col items-center justify-center min-h-screen"
    >
        <div className="text-center capitalize text-gray-800 max-w-sm l">
          <h1 className="bold text-4xl leading-12 ">
            welcome to <span>FocusFlow</span>
          </h1>
          <h2 className="bold  text-xl leading-8 ">
            your 1# tool for time organization
          </h2>
          <p className="thin text-sm opacity-40">
            our goal is to let the students organize their habbits and todos and study for long periods to get full marks
          </p>
        </div>


        <section>
          <App />
        </section>


      </div></>
  );
}
