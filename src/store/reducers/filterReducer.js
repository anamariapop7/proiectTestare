import { UPDATE_FILTER, UPDATE_LANGUAGE } from '../actions/types';


const labelsEn = {
    "Sizes": "Sizes",
    "Products": "Product(s) found.",
    "Order": "Order by",
    "OrderAsc": "Lowest to highest",
    "OrderDesc": "Highest to lowest",
    "AddToCart": "Add to cart",
    "Bag": "Bag",
    "EmptyBag": "Bag is empty! Add some product in the bag",
    "Subtotal": "Subtotal",
    "Checkout": "Checkout",
    "Quantity": "Quantity",
    "Upto": "OR UP TO",
    "Login": "Login",
    "Logout": "Logout",
    "Username": "Username",
    "Password": "Password",
    "Free": "Free shipping",
    "Select": "Select",
    "currencyId": "USD",
    "currencyFormat": "$",
    "or": "or", 
    "Submit": "Submit", 
    "Cancel": "Cancel",
    "HelpTextLogin": "Use username or email address",
    "About": "About",
    "Help": "Help",
    "Legal": "Legal",
    "Close": "Close",
     "ProceedToPayment": "Proceed to payment(PayPal)",
     "Proceed": "Proceed"
}

const labelsRo = {
    "Sizes": "Mãrimi",
    "Products": "Produs(e) gãsit(e).",
    "Order": "Ordoneazã dupã",
    "OrderAsc": "Crescãtor",
    "OrderDesc": "Descrescãtor",
    "AddToCart": "Adaugã in cos",
    "Bag": "Cos de cumpãrãturi",
    "EmptyBag": "Cosul este gol! Adaugã produse in cos",
    "Subtotal": "Subtotal",
    "Checkout": "Finalizeazã comandã",
    "Quantity": "Cantitate",
    "Upto": "Pânã la",
    "Login": "Autentificare",
    "Logout": "Deconectare",
    "Username": "Utilizator",
    "Password": "Parolã",
    "Free": "Livrare gratuitã",
    "Select": "Selecteazã",
    "currencyId": "RON",
    "or": "sau",
    "currencyFormat": "RON",
    "Cancel": "Inchide",
    "HelpTextLogin": "Foloseste numele de utilizator sau adresa de email",
    "About": "Despre",
    "Help": "Ajutor",
    "Legal": "Legal",
    "Close": "Inchide", 
    "ProceedToPayment": "Continuã cãtre plata(PayPal)",
    "Proceed": "Continuã"
}
const initialState = {
    item: [],
    language: "en",
    intlData: labelsEn
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FILTER:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_LANGUAGE:

            return {
                ...state,
                language: action.payload,
                intlData: action.payload === "ro" ? labelsRo : labelsEn
            };
        default:
            return state;
    }
}