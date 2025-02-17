import { ModeToggle } from "@/components/modleToggle";
// import { CommandDialogDemo } from "@/components/CommandDialog";
import PoweredByMrafieImage from "../../../assets/poweredbymarfie.png";
import { CommandQuickSearchRoutes } from "@/components/quickSearch";
const HeaderActions = () => {
  return (
    <div className="ml-auto flex items-center gap-4">
      <CommandQuickSearchRoutes />
      <ModeToggle />
      <img src={PoweredByMrafieImage} />
    </div>
  );
};

export default HeaderActions;
