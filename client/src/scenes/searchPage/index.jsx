import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem } from "@mui/material";
import Navbar from "scenes/navbar";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:3001/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <>
        <Navbar />
        <Box sx={{ mt: 2, ml: 45 }}> {/* Adjust the left margin here */}
          <TextField
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
          />
          <Button onClick={handleSearch} variant="contained" sx={{ mt: 2 }}>
            Search
          </Button>
          <List sx={{ mt: 2 }}>
            {results.map((result, index) => (
              <ListItem key={index}>{result.username}</ListItem>
            ))}
          </List>
        </Box>
    </>
  );
}
