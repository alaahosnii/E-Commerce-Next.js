import styles from './Spacer.module.css'
function Spacer({ direaction }: {
  direaction: string
}) {
  return (
    <div className={direaction == "horizontal" ? `${styles.HorizontalSpacer}` : `${styles.VerticalSpacer} ` }></div>
  )
}

export default Spacer