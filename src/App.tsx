import axios from "axios"
import { GameBanner } from "./components/GameBannet";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog"
import { CreateAdModal } from "./components/CreateAdModal";

import logoImg from "./asssets/logo-nlw-esports.svg";
import "./styles/main.css";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(({ data }) => setGames(data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game =>
          <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        )}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}

export default App;
