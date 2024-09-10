export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatMoneyToBRL = (value) => {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
    });
};

export const formatDatePure = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("pt-BR", options);
};

export const formatRoles = (roles) => {
    switch (roles) {
        case "admin":
            return "Administrador";
        case "cashier":
            return "Caixa";
        case "manager":
            return "Gerente";
        default:
            return "Não definido";
    }
};

export const clearEmptyQuery = (query) => {
    for (const key in query) {
        if (query[key] === "") {
            delete query[key];
        }
    }
};

export const formatPaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
        case "1":
            return "Cartão de crédito";
        case "2":
            return "Cartão de débito";
        case "3":
            return "Dinheiro";
        case "4":
            return "Pix";
        default:
            return "Não definido";
    }
};
