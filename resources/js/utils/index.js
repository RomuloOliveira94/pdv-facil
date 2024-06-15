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
}
