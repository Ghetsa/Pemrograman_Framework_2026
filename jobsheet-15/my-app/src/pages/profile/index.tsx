import { useSession } from "next-auth/react"
// import Link from "next/link"

const ProfilePage = () => {
  const {data}:any = useSession()
  return (
    <div>
      <h1>Halaman Profile</h1> <br />
      <h1>Selamat Datang {data?.user?.fullname}</h1>
    </div>
  )
}

export default ProfilePage
