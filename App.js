class App {
  users = [];
  ads = [];
  reviews = [];
  auth = []; //array
  reports = [];
  favorites = [];

  getUserByToken(token) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!authFound) return null;
    else return authFound;
  }

  login(username, password) {
    const userFound = this.users.find(function (user) {
      if (user.username === username && user.password === password) return true;
      else return false;
    });
    if (!!userFound) {
      const modelAuth = new ModelAuth(userFound.referenceKeyUser);
      this.auth = [...this.auth, modelAuth];
      console.log("Logged Successfully");
      return modelAuth.token;
    } else console.log("Account not found");
  }
  //controllo nell'array degli users se esiste l'account con quell'username e quella password

  logout(token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Non-existent Token");
    } else {
      console.log("Logout successfully done");
    }

    //controllare se l'account è loggato , se non è loggato console.log "Non-existent Token" sennò console.log "Logout successfully done"
  }

  register(username, email, password) {
    const userFound = this.users.find(function (emails) {
      if (email === emails.email) return true;
      else return false;
    });
    if (!!userFound) {
      console.log("Account already exist");
    } else {
      const modelUser = new ModelUser(username, email, password);
      this.users = [...this.users, modelUser];
      console.log("Account created");
    }
    // controllare se nell'array 'users' esiste già un oggetto con quell'username o email , se esiste già console.log "account already exist"
    // sennò richiamiamo il model e pushiamo il nuovo user nell'array con un console.log "registered successfully"
  }

  createAd(
    token,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
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
      console.log("Ad successfully created");
    }
  }

  updateAd(
    token,
    referenceKeyAd,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKeyAd === referenceKeyAd) return true;
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

  deleteAd(token, referenceKeyAd) {
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

  createReview(token, referenceKeyAd, title, description, rating) {
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

  updateReview(token, referenceKeyAd, title, description, rating) {
    //controlla il token , targhetta l'annuncio , verifica che tu sia l'owner
  }

  deleteReview(token, referenceKeyAd, referenceKeyUser) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Non-existent Token");
    } else {
      const reviewFound = this.reviews.find(function (review) {
        if (review.referenceKeyAd === referenceKeyAd) return true;
        else return false;
      });
      if (auth.referenceKeyUser !== review.referenceKeyUser)
        console.log("You can't do that");
      else {
        if (!reviewFound) console.log("Non-existent Review");
        else {
          this.reviews = this.reviews.filter(function (review) {
            if (reviewFound.referenceKeyAd !== review.referenceKeyAd)
              return true;
            else return false;
          });
          console.log("Review deleted successfully");
        }
      }
    }
    //controlla il token , targhetta l'annuncio e elimina la recensione collegata a quell'annuncio
  }

  deleteAccount(token, password) {
    //controlla il token , richiede la password per la conferma e elimina l'account
  }

  updateUsername(token, newUsername) {
    //controlla il token e modifica l'username
  }

  markAdAsSold(token, referenceKeyAd, referenceKeyUserPurchased) {
    const authFound = this.getUserByToken(token);
    if (!authFound) console.log("Non-existent Token");
    else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Non-existent Ad");
      else {
        if (!authFound.referenceKeyUser !== adFound.referenceKeyUser) {
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

  getAdListByCategory(category) {
    //cerca nell'array degli 'Ads' tutti gli oggetti con quella categoria
  }

  getAdListByText(text) {
    //cerca nell'array degli 'Ads' il testo inserito all'interno di 'title' e 'description'
  }

  detailAd(referenceKeyAd) {
    //cerca nell'array degli 'Ads' l'annuncio tramite la referenceKey
  }

  getAdListSoldByUser(token) {
    //cerca nell'array 'Ads' tutti gli oggetti col valore sold 'true'
  }

  getAdListPurchasedByUser(token) {
    //cerca nell'array 'Ads' tutti gli oggetti col valore sold 'false'
  }

  listFavorite(token) {
    //
  }

  addFavorite(token, referenceKeyAd) {
    //aggiunge nell'array 'favorites' l'annuncio targhettizzato tramite la referenceKey
  }

  detailFavorite(token, referenceKeyAd) {
    //cerca nell'array 'favorites' l'annuncio targhettizzato tramite la referenceKey
  }

  deleteFavorite(token, referenceKeyAd) {
    //elimina dall'array 'favorites' l'annuncio targhettizzato tramite la referenceKey
  }

  getPhoneNumber(token, referenceKeyAd) {}

  getListOfInterestedUserByAd(token, referenceKeyAd) {}

  getListOfPurchasedToBeConfirmed(token) {}

  markAsBought(token, referenceKeyAd) {}
}

class ModelUser {
  constructor(username, email, password) {
    this.primaryKey = Math.random();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ModelAd {
  constructor(
    referenceKeyUser,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  ) {
    this.primaryKey = Math.random();
    this.date = new Date();
    this.lead = [];
    this.referenceKeyUserPurchased = "";
    this.referenceKeyUser = referenceKeyUser;
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.address = address;
    this.phone = phone;
    this.urlPhoto = urlPhoto;
  }
}

class ModelReview {
  constructor(referenceKeyUser, referenceKeyAd, title, description, rating) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = new Date();
  }
}

class ModelAuth {
  constructor(referenceKeyUser) {
    this.primaryKey = Math.random();
    this.token = Math.random();
    this.referenceKeyUser = referenceKeyUser;
  }
}

class ModelReport {
  constructor(referenceKeyUser, referenceKeyAd, description, status) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.description = description;
    this.status = status;
  }
}

class ModelFavorite {
  constructor(referenceKeyUser, referenceKeyAd) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
  }
}

const app = new App();
