import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
	return <div className='px-[7%] py-[2%] min-h-screen'>{children}</div>
}

export default Container
