import { Inter } from '@next/font/google'
import PokeCounter from '../components/PokeCounter'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <PokeCounter></PokeCounter>
    </>
  )
}
