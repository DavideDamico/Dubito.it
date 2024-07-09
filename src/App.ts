import { ModelUser } from "./models/User";
import { ModelAd } from "./models/Ad";
import { ModelReview } from "./models/Review";
import { ModelAuth } from "./models/Auth";
import { ModelReport } from "./models/Report";
import { ModelFavorite } from "./models/Favorite";
import { ModelDevice } from "./models/Device";
import { DocAPI } from "./models/DocAPI";

export class App {
  users: ReadonlyArray<ModelUser> = [];
  ads: ReadonlyArray<ModelAd> = [];
  reviews: ReadonlyArray<ModelReview> = [];
  auth: ReadonlyArray<ModelAuth> = [];
  reports: ReadonlyArray<ModelReport> = [];
  favorites: ReadonlyArray<ModelFavorite> = [];
  devices: ReadonlyArray<ModelDevice> = [];

  getUserByToken(token: ModelAuth["token"]) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!authFound) return null;
    else return authFound;
  }

  login(username: ModelUser["username"], password: ModelUser["password"]) {
    const userFound = this.users.find(function (user) {
      if (user.username === username && user.password === password) return true;
      else return false;
    });
    if (!!userFound) {
      const auth = new ModelAuth(userFound.primaryKey);
      this.auth = [...this.auth, auth];
      console.log("Login Successful");
      return auth.token;
    } else {
      console.log("User not found");
    }
  }
  // controllo nell'array users l'email e la password, se li trova permette l'accesso, altrimenti mostra un messaggio di errore

  logout(
    referenceKeyUser: ModelAuth["referenceKeyUser"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const userFound = this.auth.find(function (auth) {
        if (auth.referenceKeyUser === referenceKeyUser) return true;
        else return false;
      });
      if (!userFound) console.log("Non-existent Token");
      else {
        this.auth = this.auth.filter(function (user) {
          if (userFound.referenceKeyUser === user.referenceKeyUser) return true;
          else return false;
        });
        return true;
      }
    }
    //controllare se l'account è loggato , se non è loggato console.log "Non-existent Token" se è loggato fargli fare il logout rimuovendo l'user dall'array di auth
  }

  register(
    username: ModelUser["username"],
    email: ModelUser["email"],
    password: ModelUser["password"]
  ) {
    const userFound = this.users.find(function (emails) {
      if (email === emails.email) return true;
      else return false;
    });
    if (!!userFound) {
      return false;
    } else {
      const modelUser = new ModelUser(username, email, password);
      this.users = [...this.users, modelUser];
      return true;
    }
    // controllare se nell'array 'users' esiste già un oggetto con quell'username o email , se esiste già console.log "account already exist"
    // sennò richiamiamo il model e pushiamo il nuovo user nell'array con un console.log "registered successfully"
  }

  getUsersList() {
    return this.users;
  }

  getReviewsList() {
    return this.reviews;
  }

  getReportsList() {
    return this.reports;
  }

  getFavoritesList() {
    return this.favorites;
  }

  getDevicesList() {
    return this.devices;
  }

  getAuthList() {
    return this.auth;
  }

  getAdsList() {
    return this.ads;
  }

  createAd(
    token: ModelAuth["token"],
    title: ModelAd["title"],
    description: ModelAd["description"],
    category: ModelAd["category"],
    status: ModelAd["status"],
    price: ModelAd["price"],
    address: ModelAd["address"],
    phone: ModelAd["phone"],
    urlPhoto: ModelAd["urlPhoto"]
  ) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Non-existent Token");
    } else {
      const newAd = new ModelAd(
        auth.referenceKeyUser,
        title,
        description,
        category,
        status,
        price,
        address,
        phone,
        urlPhoto
      );
      this.ads = [...this.ads, newAd];
      return true;
    }
  }

  updateAd(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"],
    title: ModelAd["title"],
    description: ModelAd["description"],
    category: ModelAd["category"],
    status: ModelAd["status"],
    price: ModelAd["price"],
    address: ModelAd["address"],
    phone: ModelAd["phone"],
    urlPhoto: ModelAd["urlPhoto"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!!adFound) {
        (adFound.title = title),
          (adFound.description = description),
          (adFound.category = category),
          (adFound.status = status),
          (adFound.price = price),
          (adFound.address = address),
          (adFound.phone = phone),
          (adFound.urlPhoto = urlPhoto);
      }
      console.log("Ad successfully updated");
    } else console.log("Authentication failed");
  }

  deleteAd(token: ModelAuth["token"], referenceKeyAd: ModelAd["primaryKey"]) {
    const auth = this.getUserByToken(token);
    if (!auth) console.log("Non-existent Token");
    else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Non-existent Ad");
      else {
        this.ads = this.ads.filter(function (ad) {
          if (adFound.primaryKey !== ad.primaryKey) return true;
          else return false;
        });
        console.log("Ad deleted successfully");
      }
    }
    //controlla il token , trova l'annuncio tramite l'id ed elimina l'annuncio
  }

  createReview(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"],
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"]
  ) {
    const auth = this.getUserByToken(token);
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    if (!!auth) {
      if (!!adFound) {
        const newReview = new ModelReview(
          auth.referenceKeyUser,
          referenceKeyAd,
          title,
          description,
          rating
        );
        this.reviews = [...this.reviews, newReview];
        console.log("Review created");
      } else console.log("Ad not found");
    } else console.log("Authentication failed");
    //controlla il token , targhetta l'annuncio, , verifica se si è autenticati , verifica se l'ad esiste , crea la review
  }

  updateReview(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"],
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const reviewFound = this.reviews.find(function (review) {
        if (review.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!!reviewFound) {
        reviewFound.title = title;
        reviewFound.description = description;
        reviewFound.rating = rating;
      }
    }
  }

  deleteReview(
    referenceKeyReview: ModelReview["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const auth: any = this.getUserByToken(token);
    let reviewFound: any = null;
    if (!!auth) {
      reviewFound = this.reviews.find(function (review) {
        if (review.primaryKey === referenceKeyReview) return true;
        else return false;
      });
    } else console.log("Authentication failed");

    if (!!reviewFound) {
      const isUserOwner =
        auth.referenceKeyUser === reviewFound.referenceKeyUser;
      if (isUserOwner) {
        this.reviews = this.reviews.filter(function (review) {
          if (review.primaryKey === referenceKeyReview) return false;
          else return true;
        });
      } else console.log("Not authorized");
    } else console.log("Review not found");
  }

  deleteAccount(token: ModelAuth["token"]) {
    const authFound: any = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });

    this.users = this.users.filter(function (user) {
      if (authFound.referenceKeyUser === user.primaryKey) return false;
      else return true;
    });
  }

  updateUsername(username: ModelUser["username"], token: ModelAuth["token"]) {
    const authFound: any = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });

    const userFound: any = this.users.find(function (user) {
      if (authFound.referenceKeyUser === user.primaryKey) return true;
      else return false;
    });

    this.users.map(function (user) {
      if (user.primaryKey === userFound.primaryKeyUser)
        return { ...user, username: username };
      else return user;
    });
  }

  createReport(
    referenceKeyAd: ModelAd["primaryKey"],
    token: ModelAuth["token"],
    title: ModelReport["title"],
    description: ModelReport["description"]
  ) {
    const auth = this.getUserByToken(token);
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    if (!!auth) {
      if (!!adFound) {
        const newReport = new ModelReport(
          auth.referenceKeyUser,
          referenceKeyAd,
          title,
          description,
          status
        );
        this.reports = [...this.reports, newReport];
      } else console.log("Ad not found");
    } else console.log("Authentication failed");
  }

  closeReport(
    referenceKeyReport: ModelReport["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const auth: any = this.getUserByToken(token);
    let reportFound: any = null;
    if (!!auth) {
      reportFound = this.reports.find(function (report) {
        if (report.primaryKey === referenceKeyReport) return true;
        else return false;
      });
    } else console.log("Authentication failed");

    if (!!reportFound) {
      this.reports = this.reports.map(function (report) {
        if (reportFound.primaryKey === report.primaryKey)
          return {
            ...auth,
            closed: true,
          };
        else return auth;
      });
    } else console.log("Report not found");
  }

  markAdAsSold(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"],
    referenceKeyUserPurchased: ModelAd["referenceKeyUserPurchased"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!authFound) console.log("Non-existent Token");
    else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Non-existent Ad");
      else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Author not recognized");
        } else {
          this.ads = this.ads.map(function (ad) {
            if (adFound.primaryKey === ad.primaryKey) {
              return {
                ...ad,
                referenceKeyUserPurchased: referenceKeyUserPurchased,
              };
            } else {
              return { ...ad };
            }
          });
        }
      }
    }
    //controlla il token , targhetta l'annuncio e lo marchia come venduto
  }

  markAdAsBought(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Ad not found");
      else {
        this.ads = [...this.ads, adFound];
      }
    } else console.log("Authentication failed");
  }

  getAdListByCategory(category: ModelAd["category"]) {
    return this.ads.filter(function (ad) {
      if (ad.category === category) return true;
      else return false;
    }); // cerca nell'array ads la category, se la trova restituisce l'array filtrato, altrimenti restituisce un array vuoto
  }

  getAdListByTitle(text: ModelAd["title"]) {
    //cerca nell'array degli 'Ads' il testo inserito all'interno di 'title' e
  }

  detailAd(referenceKeyAd: ModelAd["primaryKey"]) {
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
    if (!adFound) console.log("Ad not found");
    else console.log(adFound);
    //cerca nell'array degli 'Ads' l'annuncio tramite la referenceKey
  }

  getAdListSoldByUser(
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    return this.ads.filter(function (ad) {
      if (
        ad.referenceKeyUser === referenceKeyUser &&
        ad.referenceKeyUserPurchased !== 0
      )
        return true;
      else return false;
    }); // cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
  }

  getAdListPurchasedByUser(
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    return this.ads.filter(function (ad) {
      if (ad.referenceKeyUserPurchased === referenceKeyUser) return true;
      else return false;
    }); // cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
  }

  listUserFavorites(
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    return this.favorites.filter(function (favorite) {
      if (favorite.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    }); // cerca nell'array favorites l'id, se lo trova restituisce l'array filtrato, altrimenti restituisce un array vuoto
  }

  createFavorite(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const newFavorite = new ModelFavorite(referenceKeyUser, referenceKeyAd);
      this.favorites = [...this.favorites, newFavorite];
    } else console.log("Token not valid");
  }

  detailFavorite(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
  }

  deleteFavorite(
    token: ModelAuth["token"],
    referenceKeyFavorite: ModelFavorite["primaryKey"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const favFound = this.favorites.find(function (favorite) {
        if (favorite.primaryKey === referenceKeyFavorite) return true;
        else return false;
      });
      if (!favFound) console.log("Ad not found");
      else {
        this.favorites = this.favorites.filter(function (favorites: {
          primaryKey: any;
        }) {
          if (favFound.primaryKey === favorites.primaryKey) return true;
          else return false;
        });
      }
    } else console.log("Token not valid");
  }

  getPhoneNumber(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"]
  ) {}

  getListOfInterestedUserByAd(
    token: ModelAuth["token"],
    referenceKeyAd: ModelAd["primaryKey"]
  ) {}

  getListOfPurchasedToBeConfirmed(token: ModelAuth["token"]) {}

  registerDevice(token: ModelAuth["token"], idDevice: ModelDevice["idDevice"]) {
    const auth: any = this.getUserByToken(token);
    const userDevices = this.devices.filter(function (device) {
      if (device.referenceKeyUser === auth.referenceKeyUser) return true;
      else return false;
    });
    if (!!auth) {
      if (userDevices.length < 2) {
        const newDevice = new ModelDevice(auth.referenceKeyUser, idDevice);
        this.devices = [...this.devices, newDevice];
      } else console.log("Maximum number of devices reached");
    } else console.log("Authentication failed");
  }

  changeDeviceName(
    token: ModelAuth["token"],
    deviceName: ModelDevice["deviceName"],
    idDevice: ModelDevice["idDevice"]
  ) {
    const auth: any = this.getUserByToken(token);
    const device: any = this.devices.find(function (device) {
      if (
        device.referenceKeyUser === auth.referenceKeyUser &&
        device.idDevice === idDevice
      )
        return true;
      else return false;
    });
    if (!!auth) {
      if (
        device.referenceKeyUser === auth.referenceKeyUser &&
        device.idDevice === idDevice
      ) {
        this.devices = this.devices.map(function (device) {
          if (
            device.referenceKeyUser === auth.referenceKeyUser &&
            device.idDevice === idDevice
          ) {
            return { ...device, deviceName: deviceName };
          } else return device;
        });
      } else console.log("It is not possible to modify this device");
    } else console.log("Authentication failed");
  }

  deleteDevice(token: ModelAuth["token"], idDevice: ModelDevice["idDevice"]) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      this.devices = this.devices.filter(function (device) {
        if (
          device.referenceKeyUser === auth.referenceKeyUser &&
          device.idDevice === idDevice
        )
          return false;
        else return true;
      });
    } else console.log("Authentication failed");
  }
}

const app = new App();

const apis = {
  register: new DocAPI("/auth/register", "POST", false),
  login: new DocAPI("/auth/login", "POST", false),
  logout: new DocAPI("/auth/logout", "GET", true),
  createAd: new DocAPI("/ads", "POST", true),
  updateAd: new DocAPI("/ads/{primaryKey}", "PUT", true),
  deleteAd: new DocAPI("/ads/{primaryKey}", "DELETE", true),
  createReview: new DocAPI("/ads/{primaryKey}/reviews", "POST", true),
  updateReview: new DocAPI(
    "/ads/{primaryKey}/reviews/{primaryKey}",
    "PUT",
    true
  ),
  deleteReview: new DocAPI(
    "/ads/{primaryKey}/reviews/{primaryKey}",
    "DELETE",
    true
  ),
  deleteAccount: new DocAPI("/users/{primaryKey}", "DELETE", true),
  updateUsername: new DocAPI("/users/{primaryKey}", "PATCH", true),
  createReport: new DocAPI("/reports", "POST", true),
  closeReport: new DocAPI("/reports/{primaryKey}", "PATCH", true),
  markAdAsSold: new DocAPI("/ads/{primaryKey}", "PATCH", true),
  getAdListByCategory: new DocAPI("/ads?category=", "GET", true),
  getAdListByTitle: new DocAPI("/ads?title=", "GET", true),
  detailAd: new DocAPI("/ads/{primaryKey}", "GET", true),
  getAdListSoldByUser: new DocAPI("/ads?sold=", "GET", true),
  getAdListPurchasedByUser: new DocAPI("/ads?purchased=", "GET", true),
  listFavorite: new DocAPI("/users/{primaryKey}/favorites", "GET", true),
  createFavorite: new DocAPI(
    "/users/{primaryKey}/favorites/{primaryKey}",
    "POST",
    true
  ),
  detailFavorite: new DocAPI(
    "/users/{primaryKey}/favorites/{primaryKey}",
    "GET",
    true
  ),
  deleteFavorite: new DocAPI(
    "/users/{primaryKey}/favorites/{primaryKey}",
    "DELETE",
    true
  ),
  getPhoneNumber: new DocAPI(
    "/ads/{primaryKey}/phone/{primaryKey}",
    "GET",
    true
  ),
  getListOfInterestedUserByAd: new DocAPI(
    "/ads/{primaryKey}/leads",
    "GET",
    true
  ),
  getListOfPurchasedToBeConfirmed: new DocAPI(
    "/users/{primaryKey}/interested/pending",
    "GET",
    true
  ),
  markAsBought: new DocAPI("/ads/{primaryKey}", "PATCH", true),
  registerDevice: new DocAPI("/devices", "POST", true),
  changeDeviceName: new DocAPI("/devices/{primaryKey}", "PATCH", true),
  deleteDevice: new DocAPI("/devices/{primaryKey}", "DELETE", true),
};
