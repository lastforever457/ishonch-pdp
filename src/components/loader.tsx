import { Riple } from 'react-loading-indicators'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)]">
      <Riple color="#32cd32" size="large" text="" textColor="" />
    </div>
  )
}
