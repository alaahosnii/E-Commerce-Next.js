"use client"
import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from 'react'
import CategoryItem from "./CategoryItem/CategoryItem";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import { useRouter } from "next/navigation";

interface Props {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function DrawerList({ setIsDrawerOpen }: Props) {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useRouter();
  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Contact",
      href: "/Contact",
    },
    {
      name: "About",
      href: "/About",
    },
  ]
  const newLinks = [...links];

  if (authState.user) {
    newLinks.push({
      name: "Account",
      href: "/Account",
    });
  } else {
    newLinks.push({
      name: "Sign Up",
      href: "/signup",
    });
  }
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsDrawerOpen(false)}>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton>
              <CategoryItem categoryName={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {newLinks.map((link) => (
          <ListItem key={link.name} disablePadding>
            <ListItemButton onClick={() => navigate.push(link.href)}>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
