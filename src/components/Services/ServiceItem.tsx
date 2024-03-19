import { useAccountContext } from "../../context/account";
import { Avatar } from "../Avatar";

interface Props {
  id: string;
  name: string;
  price: number;
  image?: string;
  selected: boolean;
  handleClick(): void;
}

export function ServiceItem({
  id,
  name,
  price,
  image,
  selected,
  handleClick,
}: Props) {
  const { account } = useAccountContext();
  const { colors } = account;

  return (
    <div
      key={id}
      className={selected ? "selected" : ""}
      style={{
        width: "100%",
        height: 180,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBlock: 10,
        transition: "all 0.3s",
        border: selected ? `1px solid ${colors.primary}` : "none",
        backgroundColor: selected ? colors.selected : "#F6F6F6",
      }}
      onClick={handleClick}
    >
      <p>{name}</p>
      <Avatar url={image || ""} />
      <p>
        {Number(price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}
