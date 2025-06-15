/**
 * Stock l'UID du joueur
 */
let UIDjoueur;

let alerte = document.getElementById("alerte");
let sucess = document.getElementById("sucess");
let Scontainer = document.getElementById("sucess-container");
let temps = document.getElementById("temps");
const Acontainer = document.getElementById("alert-container");

const boutonValidation = document.getElementById("Valider");
const button = document.getElementById("attente");
const chercher = document.getElementById("chercher");
const prendre = document.getElementById("Prendre");
const espion = document.getElementById("espion");
const voler = document.getElementById("voler");
const Verifier = document.getElementById("Verifier");
const tousPrendre = document.getElementById("tousPrendre");
const magicNumber = document.getElementById("ValiderMagic");
const posToutesPièces = document.getElementById("triche");

let res = () => {
  alerte.textContent = "";
  sucess.textContent = "";
  alerte.style.display = "none";
  sucess.style.display = "none";
  Acontainer.style.display = "none";
  Scontainer.style.display = "none";
};

let piecesOr = [];
/**
 * permet de charger le plateau de jeu.
 */
const chargementPlateau = () => {
  const plateau = document.getElementById("chargementPlateau");
  plateau.innerHTML = "";
  plateau.style.display = "inline-block";

  fetch("https://pixel-api.codenestedu.fr/tableau")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const ligne = document.createElement("div");
        ligne.style.lineHeight = "0";

        for (let j = 0; j < data[i].length; j++) {
          const pixel = document.createElement("div");
          pixel.style.width = "6px";
          pixel.style.height = "6px";
          pixel.style.backgroundColor = data[i][j];
          pixel.style.display = "inline-block";
          pixel.style.border = " 1px solid black";
          ligne.appendChild(pixel);
          if (data[i][j] === "rgb(255, 255, 0)" || data[i][j] === "yellow") {
            piecesOr.push({ ligne: i, colonne: j });
          }
        }
        plateau.appendChild(ligne);
      }
      console.log("piece : " + piecesOr);
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
};

chargementPlateau();

/**
 * permet d'afficher les pièces disponible en banque pour chaque équipe.
 */
const pieceenBanque = () => {
  let corptab = document.getElementById("bodyTab");

  if (!corptab) {
    console.error("Élément 'bodyTab' introuvable !");
    return;
  }

  corptab.innerHTML = "";

  fetch("https://pixel-api.codenestedu.fr/piecesEnBanque")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Données reçues:", data);

      // Créer un en-tête
      let headerTr = document.createElement("tr");
      headerTr.innerHTML = `
              <th scope="row">Groupe</th>
              <th>Nombre de pièces</th>
              <th>Total trésor</th>
     
          `;
      corptab.appendChild(headerTr);
      data.forEach((groupe) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                  <th scope="row">${groupe.groupe}</th>
                  <td class="table-info">${groupe.nombreDePieces}</td>
                  <td class="table-success">${groupe.totalTresor}</td>
         
              `;
        corptab.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
};

pieceenBanque();

/**
 * permet d'afficher la liste des joueurs ayant modifié le tableau dans les 50 dernières minutes.
 */
const listJoueur = () => {
  let cpt = 1;
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  fetch("https://pixel-api.codenestedu.fr/liste-joueurs")
    .then((r) => r.json())
    .then((data) => {
      for (let d of data) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <th scope="row">${cpt}</th>
                  <td>${d.nom}</td>
                  <td>${d.groupe}</td>
                  <td>${d.banned}</td>
                  <td>${d.nbPixelsModifies}</td>
                  <td>${d.lastModificationPixel}</td>
              `;
        tbody.appendChild(tr);
        cpt++; // Incrémenter le compteur
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
};

listJoueur();

/**
 * Permet au joueur de selectionner son equipe.
 */

const validerEquipe = () => {
  boutonValidation.addEventListener("click", () => {
    res();

    let entreeUtilisateur = document.getElementById("uid").value.trim();

    if (entreeUtilisateur === "") {
      alerte.textContent = "Veuillez entrer un UID.";
      alerte.style.display = "block";
      Acontainer.style.display = "block";
      return;
    }

    console.log("UID entré :", entreeUtilisateur);
    fetch(
      `https://pixel-api.codenestedu.fr/equipe-utilisateur?uid=${entreeUtilisateur}`
    )
      .then((r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            alerte.textContent = errorData.error;
            alerte.style.display = "block";
            Acontainer.style.display = "block";
            throw new Error(errorData.error);
          });
        } else {
          UIDjoueur = entreeUtilisateur;
          return r.json();
        }
      })
      .then((data) => {
        Object.keys(data);
        sucess.textContent = "vous etes en équipe " + data.equipe;
        sucess.style.display = "block";
        Scontainer.style.display = "block";
      });
  });
};
validerEquipe();

/**
 * Gestion de sauvegarde de l' UID
 * @param {*} uid
 */

const saveUID = (uid) => {
  document.cookie = `uid=${uid}; expires=${new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toUTCString()}; path=/`;
};

const getUID = () => {
  const match = document.cookie.match(/uid=([^;]*)/);
  return match ? match[1] : null;
};

UIDjoueur = getUID();

if (!UIDjoueur) {
  const uid = prompt("Entrez votre UID:");
  if (uid && uid.trim()) {
    UIDjoueur = uid.trim();
    saveUID(UIDjoueur);
  }
}

const tempAttente = () => {
  temps.innerHTML = "";
  res();
  fetch(`https://pixel-api.codenestedu.fr/temps-attente?uid=${UIDjoueur}`)
    .then((r) => {
      if (!r.ok) {
        return r.json().then((errorData) => {
          alerte.textContent = errorData.error;
          alerte.style.display = "block";
          Acontainer.style.display = "block";
          throw new Error(errorData.error);
        });
      }
      console.log(3);
      return r.json();
    })
    .then((data) => {
      temps.innerHTML = `  
<h5><u>Temps d'attente</u></h5>
<p>vous devez attendre ${data.tempsAttente / 1000} secondes </p>`;
    })
    .catch((error) => {
      console.error("Erreur attrapée :", error.message);
    });
};

let chercherPiece = () => {
  chercher.addEventListener("click", () => {
    res();

    if (!UIDjoueur) {
      alert("Veuillez entrer un UID.");
      return;
    }

    let col = document.getElementById("colonne").value.trim();
    let ligne = document.getElementById("ligne").value.trim();

    if (col === "" || ligne === "") {
      alerte.style.display = "block";
      alerte.textContent = "La ligne ou la colonne est non définie.";
      Acontainer.style.display = "block";
      return;
    }

    let colNum = Number(col);
    let ligneNum = Number(ligne);

    let formatedData = {
      uid: UIDjoueur,
      lig: ligneNum,
      col: colNum,
    };

    fetch("https://pixel-api.codenestedu.fr/chercherPiece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedData),
    })
      .then((r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            throw new Error(errorData.error || `HTTP ${r.status}`);
          });
        }
        return r.json();
      })
      .then((data) => {
        let message = `Pièce détectée sur la ligne ${data.piecePresenteLigne} et la colonne ${data.piecePresenteColonne}.`;
        sucess.textContent = message;
        sucess.style.display = "block";
        Scontainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Erreur attrapée :", error.message);
        alerte.style.display = "block";
        alerte.textContent = error.message || "Erreur lors de la recherche.";
        Acontainer.style.display = "block";
      });
    tempAttente();
  });
};

chercherPiece();

let prendrePiece = () => {
  prendre.addEventListener("click", () => {
    if (!UIDjoueur) {
      alert("rentrer un uid");
      return;
    }

    let col = document.getElementById("colonne").value;
    let ligne = document.getElementById("ligne").value;

    if (!ligne || !col) {
      alert("Veuillez saisir une ligne et une colonne");
      return;
    }

    if (isNaN(ligne) || isNaN(col)) {
      alert("Ligne et colonne doivent être des nombres");
      return;
    }

    let ligneNum = Number(ligne);
    let colNum = Number(col);

    if (ligneNum < 0 || ligneNum > 99 || colNum < 0 || colNum > 99) {
      alert("Ligne et colonne doivent être entre 0 et 99");
      return;
    }

    console.log("UIDjoueur:", UIDjoueur);
    console.log("ligne:", ligneNum, "col:", colNum);

    let formatedData = {
      uid: UIDjoueur,
      lig: ligneNum,
      col: colNum,
    };

    fetch("https://pixel-api.codenestedu.fr/prendrePiece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedData),
    })
      .then(async (r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            alerte.textContent = errorData.error;
            alerte.style.display = "block";
            Acontainer.style.display = "block";
            throw new Error(errorData.error);
          });
        }
        return r.json();
      })
      .then((data) => {
        console.log("Réponse complète de l'API:", data); // Pour déboguer

        if (data.error) {
          alerte.textContent = data.error;
          alerte.style.display = "block";
          Acontainer.style.display = "block";
        }

        if (data.piecePresente === true) {
          sucess.textContent =
            "Vous avez récupéré la pièce de valeur : " + data.valeurPiece;
          sucess.style.display = "block";
          Scontainer.style.display = "block";
        } else {
          alert("Vous êtes arrivé trop tard, il n'y a plus de pièce ici");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la prise de pièce:", error);
      });
    tempAttente();
  });
};

prendrePiece();

const payerEspion = () => {
  espion.addEventListener("click", () => {
    if (!UIDjoueur) {
      alert("rentrer un uid");
      return;
    }
    res();

    let formatedData = {
      uid: UIDjoueur,
    };

    fetch("https://pixel-api.codenestedu.fr/payerEspion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedData),
    })
      .then((r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            alerte.textContent = errorData.error;
            alerte.style.display = "block";
            Acontainer.style.display = "block";
            throw new Error(errorData.error || `HTTP ${r.status}`);
          });
        }
        return r.json();
      })
      .then((d) => {
        sucess.textContent = d.success;
        sucess.style.display = "block";
        Scontainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Erreur lors de la paye de l'espion:", error);
      });
    tempAttente();
  });
};
payerEspion();

const PrendrenbPieceMaximum = () => {
  tousPrendre.addEventListener("click", async () => {
    if (!UIDjoueur) {
      alert("rentrer un uid");
      return;
    }

    if(piecesOr.length === 0){
      sucess.textContent = "Plus de pièce disponible sur le plateau.";
      sucess.style.display = "block";
      Scontainer.style.display = "block";
      return; 
    }

    for (let piece of piecesOr) {
      let formatedData = {
        uid: UIDjoueur,
        lig: parseInt(piece.ligne),
        col: parseInt(piece.colonne),
      };
      await fetch("https://pixel-api.codenestedu.fr/prendrePiece", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      })
        .then((r) => {
          if (!r.ok) {
            return r.json().then((errorData) => {
              alerte.textContent = errorData.error;
              alerte.style.display = "block";
              Acontainer.style.display = "block";
              throw new Error(errorData.error);
            });
          }
          return r.json();
        })

        .then((data) => {
          if (data.piecePresente === true) {
            sucess.textContent =
              "il y a une pièce  de valeure :  " +
              data.valeurPiece +
              "en ligne " +
              piece.ligne +
              "et en col " +
              piece.colonne;
            sucess.style.display = "block";
            Scontainer.style.display = "block";
          } else {
            alert("Vous arrivé trop tard  , il n'y a plus de pièce ici");
          }
        })
        .catch((error) => {
          console.error("Erreur : ", error);
        });
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    tempAttente();
  });
};

PrendrenbPieceMaximum();

const volerPiece = () => {
  voler.addEventListener("click", () => {
    if (!UIDjoueur) {
      alert("rentrer un uid");
      return;
    }
    res();
    let col = document.getElementById("colonne").value.trim();
    let ligne = document.getElementById("ligne").value.trim();
    let formatedData = {
      uid: UIDjoueur,
      lig: parseInt(ligne),
      col: parseInt(col),
    };
    fetch("https://pixel-api.codenestedu.fr/volerPiece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedData),
    })
      .then((r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            alerte.textContent = errorData.error;
            alerte.style.display = "block";
            Acontainer.style.display = "block";
            throw new Error(errorData.error || `HTTP ${r.status}`);
          });
        }
        return r.json();
      })
      .then((data) => {
        if (data.error) {
          alerte.textContent = data.error;
          alerte.style.display = "block";
          Acontainer.style.display = "block";
        }

        sucess.textContent =
          data.success + " la valeure de la pièce est de " + data.piece.valeur;
        sucess.style.display = "block";
        Scontainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
    tempAttente();
  });
};
volerPiece();

const Mnumber = () => {
  magicNumber.addEventListener("click", () => {
    if (!UIDjoueur) {
      alert("rentrer un uid");
      return;
    }
    res();
    let form = document.getElementById("numberMagic").value.trim();
    let formatedData = {
      uid: UIDjoueur,
      magicNumber: form,
    };
    fetch("https://pixel-api.codenestedu.fr/magic-number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedData),
    })
      .then((r) => {
        if (!r.ok) {
          return r.json().then((errorData) => {
            alerte.textContent = errorData.error;
            alerte.style.display = "block";
            Acontainer.style.display = "block";
            throw new Error(errorData.error);
          });
        }
        return r.json();
      })
      .then((data) => {
        if (data.error) {
          alerte.textContent = data.error;
          alerte.style.display = "block";
          Acontainer.style.display = "block";
        }
        sucess.textContent = data.message;
        sucess.style.display = "block";
        Scontainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
    tempAttente();
  });
};
Mnumber();


let afficherCoordonnéesDesPiècesDor =() =>{

  if (!UIDjoueur) {
    alert("rentrer un uid");
    return;
  }

  posToutesPièces.addEventListener("click" , () =>{
    if(piecesOr.length === 0){
      sucess.textContent = "Plus de pièce disponible sur le plateau.";
      sucess.style.display = "block";
      Scontainer.style.display = "block";
      return; 
    }

    let cpt = 1;
    for(let d of piecesOr){
      sucess.textContent =  cpt ,  " :  ( "   , d.ligne ,  d.colonne ,  " )"  ;
      sucess.style.display = "block";
      Scontainer.style.display = "block";
      cpt ++;
    }
  })
}
afficherCoordonnéesDesPiècesDor()
