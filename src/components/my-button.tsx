import React from 'react'

const MyButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center border-0 bg-primary-green hover:!bg-lime-600 md:px-6 md:py-3 p-3 rounded-2xl font-semibold text-center text-lg text-white hover:!text-[#f5f5f5]"
    >
      <span className="md:flex hidden">{children}</span>
    </button>
  )
}

export default MyButton
