import * as SelectPrimitive from "@radix-ui/react-select";
import axios from "axios";
import { CaretDown, CaretUp, Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { Game } from "../../../App";
import api from "../../../services/api";

interface Props {
  name: string;
}

export const Select = ({ name }: Props) => {
  const [games, setGames] = useState<Game[]>([]);

  const handleFetchGames = async () => {
    try {
      const { data } = await api.get("/games");
      setGames(data);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchGames();
  }, []);

  return (
    <SelectPrimitive.Root name={name}>
      <SelectPrimitive.Trigger
        aria-label="game"
        className="flex items-center justify-between py-3 px-4 bg-zinc-900 rounded"
      >
        <SelectPrimitive.Value
          placeholder="Selecione o game que deseja jogar"
          className="placeholder:text-zinc-500"
        />
        <SelectPrimitive.Icon>
          <CaretDown size={24} />
        </SelectPrimitive.Icon>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="bg-zinc-900 border border-zinc-500 rounded overflow-hidden placeholder:text-zinc-500">
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-2">
              <CaretUp size={24} />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="bg-zinc-900 rounded-lg py-3 px-4">
              {games.map((game, idx) => (
                <SelectPrimitive.Item
                  key={game.id}
                  value={game.id}
                  className={`flex items-center gap-4 text-white cursor-pointer relative ml-6 mt-${
                    idx > 0 ? "4" : "0"
                  }`}
                >
                  <SelectPrimitive.ItemIndicator className="absolute -left-[26px]">
                    <Check />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>
                    {game.title}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-white py-2">
              <CaretUp size={24} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Trigger>
    </SelectPrimitive.Root>
  );
};
