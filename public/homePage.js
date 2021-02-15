'use strict'

const out = new LogoutButton();

out.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const rate = new RatesBoard();

function rateBoards (rate) {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            rate.clearTable();
            rate.fillTable(response.data);
        }
    });
}

rateBoards(rate);
setInterval(rateBoards, 60000, rate);

const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Денежные средства успешно поступили на счет' : response.error);
    });
}

money.conversionMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Конвертация валюты прошла успешно' : response.error);
    });
}

money.sendMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        money.setMessage(response.success, response.success ? 'Денежные средства отправлены успешно' : response.error);
    });
}

const favorite = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

favorite.addUserCallback = () => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
        } 
        favorite.setMessage(response.success, response.success ? 'Новый контакт добавлен успешно' : response.error);
    });
}

favorite.removeUserCallback = () => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
        } 
        favorite.setMessage(response.success, response.success ? 'Контакт успешно удален из Адресной книги' : response.error);
    });
}