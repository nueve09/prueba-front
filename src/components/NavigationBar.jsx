import { ArrowLeftIcon, SendMoneyIcon } from "../Icons/Svgs";
import { GetBackIcon } from "../Icons/Svgs";
import { StatsIcon } from "../Icons/Svgs";
import { BalanceIcon } from "../Icons/Svgs";
import { CreditCardIcon } from "../Icons/Svgs";
import { HomeIcon } from "../Icons/Svgs";

const NavigationBar = () => {
  return (
    <nav className="sm:h-screen sm:w-[120px] min-h-min w-full gap:4 bg-primary-gray flex sm:flex-col flex-row justify-around">
      <section className="relative logo-container bg-black rounded-3xl aspect-square h-[100px] sm:my-6 sm:mx-auto text-white">
        <button className="absolute sm:block hidden right-0 top-1/2 -translate-y-1/2 translate-x-full bg-primary-blue rounded-full border-4 border-secondary-gray">
          <ArrowLeftIcon />
        </button>
      </section>
      <section className="sm:grid flex sm:gap-[40px] gap-[10px] sm:justify-center sm:content-center h-full text-white place-self-center">
        <button>
          <HomeIcon />
        </button>
        <button>
          <SendMoneyIcon />
        </button>
        <button>
          <CreditCardIcon />
        </button>
        <button>
          <BalanceIcon />
        </button>
        <button>
          <GetBackIcon />
        </button>
        <button>
          <StatsIcon />
        </button>
      </section>
    </nav>
  );
};
export default NavigationBar;
