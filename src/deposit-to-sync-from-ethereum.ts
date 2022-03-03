import * as zksync from "zksync";
import * as ethers from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function main(): Promise<void> {
  const MNEMONIC = process.env.MNEMONIC!;
  const syncProvider = await zksync.getDefaultProvider("rinkeby");
  const ethersProvider = ethers.getDefaultProvider("rinkeby");

  // memo: 0x13FCd5b4348feFe49aAcf98275cBd9f5F2A2acd2
  const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(
    ethersProvider
  );

  console.log(ethWallet.address);

  try {
    const syncWallet = await zksync.Wallet.fromEthSigner(
      ethWallet,
      syncProvider
    );

    const deposit = await syncWallet.depositToSyncFromEthereum({
      depositTo: syncWallet.address(),
      token: "ETH",
      amount: ethers.utils.parseEther("0.00000000000001"),
    });

    console.log(deposit);

    const rept = await deposit.awaitReceipt();

    console.log(rept);

    const verifiedRept = await deposit.awaitVerifyReceipt();

    console.log(verifiedRept);
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
