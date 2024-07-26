# EDAS Frontend

This is the frontend for the EDAS decision support system, built with Vite and React. It provides a user-friendly interface to interact with the EDAS API, making it easy to input your decision criteria and alternatives. The frontend handles data visualization and presents the ranked results in a clear and intuitive way.

## Features

- **Intuitive Form:** Easily input alternatives and criteria.
- **Dynamic Criteria:** Add or remove criteria as needed.
- **Weight Adjustment:** Assign importance to each criterion.
- **Result Visualization:** See ranked alternatives in a visually appealing way.
- **Error Handling:**  Provides feedback for incorrect input.
- **API Integration:** Seamlessly communicates with the EDAS API. 

## Getting Started

### Prerequisites

- Node.js and npm (or yarn)

### Installation

1. `git clone https://github.com/DumbiFadhil/edas-fe.git`
2. `cd edas-fe`
3. `npm install` (or `yarn install`)

### Development

- Run the development server: `npm run dev` (or `yarn dev`)
- Open http://localhost:5173 in your browser. 

### Build for Production

- `npm run build` (or `yarn build`)

## How to Use

1. Choose Input Method:
    - **Preset:** Select from a list of predefined alternatives and scores. (If you have preset data available)
    - **Manual CSV:** Upload a CSV file containing both criteria and alternative data.

2. Input Data:
    - **Preset:**
      - Enter a unique name for each alternative in the provided fields.
      - Enter the corresponding scores for each alternative in the respective fields.
    - **Manual CSV:**
      - Ensure your CSV file follows the specified format:
        - **Criteria Section:** name,weight,type (where type is either benefit or cost)
        - **Alternatives Section:** name,C1,C2,... (where C1, C2, etc., are the criterion names)
        - **Important:** Variable names are case-sensitive, and scores/weights must be numeric.
      - Upload the CSV file using the file input.
3. Click "Submit": The frontend will process your data and send it to the EDAS API.

4. View Results: The calculated rankings will be displayed in a clear table, showing each alternative's name and final EDAS score.

**Example CSV Format:**
  ```csv
    ## Criterias
    name,weight,type
    C1,0.1380597015,cost
    C2,0.1455223881,benefit
    ...

    ## Alternatives
    name,C1,C2,...
    UI - Ilmu Komputer,6041750,3,...
    ITB - Teknik Informatika,5450000,3,...
    ...
  ```

## Important Considerations:

- All variable names are case-sensitive. Ensure they match exactly as shown in the example.
- Criterion types must be either "benefit" or "cost" (in lowercase).
- Scores and weights must be numeric values (float64 or integers).

## Contributing

We welcome contributions! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.
