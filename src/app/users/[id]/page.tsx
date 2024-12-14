

interface IUserInfo {
  params: Promise<{userId: string}>
}

const UserInfo = async (props: IUserInfo) => {
  const userId = (await props.params).userId

  return (
    <></>
  )
}