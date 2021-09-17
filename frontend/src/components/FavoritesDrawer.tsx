import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";
import type { DrawerProps } from "@chakra-ui/modal";

type FavoritesDrawerProps = Omit<DrawerProps, "children">;

function FavoritesDrawer(props: FavoritesDrawerProps) {
  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorieten</DrawerHeader>

        <DrawerBody></DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default FavoritesDrawer;
