
interface IButton {
  text: string
  invert: boolean
  rounded: boolean
  
}

const Button = (props: IButton) => (
  <button
    className={``}
  >
    {props.text}
  </button>
)


export default Button