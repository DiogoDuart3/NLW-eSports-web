import axios from 'axios'
import { FormEvent, useState } from "react";
import { CaretDown, Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from "./Form/Input";

interface Props {
  games: [{
    id: string;
    title: string;
  }];
}

export function CreateAdModal({ games }: Props) {
  const [game, setGame] = useState<string | undefined>()
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const [submitting, setSubmitting] = useState(false)

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name)
      return;

    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar anúncio')
    }

    setSubmitting(false)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root value={game} onValueChange={setGame}>
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center d-placeholder:text-zinc-500">
                <Select.Value placeholder="Selecione o game que deseja jogar" className="text-white" />
                <Select.Icon><CaretDown /></Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content id="game" className="bg-zinc-800 text-white rounded text-sm">
                  <Select.ScrollUpButton />
                  <Select.Viewport className="text-sm">
                    <Select.Group>
                      {games.map(game => (
                        <Select.Item value={game.id} key={game.id} className="cursor-pointer py-3 px-4 rounded flex align-center justify-between d-highlighted:bg-zinc-900">
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator className="my-auto">
                            <Check />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" id="name" placeholder="Como se chama dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga à quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" placeholder="User#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input type="time" name="hourStart" id="hourStart" placeholder="De" />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => setUseVoiceChannel(checked === true)}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >Cancelar</Dialog.Close>
            <button
              type="submit"
              disabled={submitting}
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 disabled:bg-zinc-500"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>

        </form>

      </Dialog.Content>
    </Dialog.Portal>
  )
}