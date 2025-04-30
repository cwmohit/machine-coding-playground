import AutoComplete from "@/Components/AutoComplete"

const SearchBar = () => {
  async function fetchSuggestions(query) {
     const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
    }
    const data = await response.json();
    return data.recipes;
  }  

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full p-20">
        <h1 className="text-2xl font-bold mb-4">Auto Complete Search</h1>
        <div className="max-w-xl w-full">
            <AutoComplete
                placeholder="Enter Recipe"
                fetchSuggestions={fetchSuggestions}
                // Should support staticData={["Pizza", "Pasta", "Burger", "Salad", "Sushi"]}
                dataKey="name"
                customLoading={<>Loading Recipe...</>}
                onSelect={(res) => { 
                    console.log(res)
                }}
                onChange={(input) => {
                    console.log(input)
                }}
                onFocus={(e) => {
                    console.log("onFocus")
                }}
                onBlur={(e) => {
                    console.log("onBlur")
                }}
                customStyle={{}}
            />
        </div>
    </div>
  )
}

export default SearchBar