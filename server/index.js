const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = new MerkleTree(niceList);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  
  // TODO: prove that a name is in the list
  const { name } = req.body;
  // console.log(body.name);
  
  // const name = 'Raymond Dickens';
  const index = niceList.findIndex(n => n === name);
  let proof = MERKLE_ROOT.getProof(index);

  let root = MERKLE_ROOT.getRoot();

  // console.log("Proof: ", proof);
  let v_proof = verifyProof(proof, name, root);
  // console.log("V Proof: ", v_proof);

  const isInTheList = v_proof;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
