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

    const MNEMONIC2 = process.env.MNEMONIC!;
    const ethWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(
      ethersProvider
    );
    const syncWallet2 = await zksync.Wallet.fromEthSigner(
      ethWallet2,
      syncProvider
    );

    const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
      ethAddress: ethWallet2.address,
      token: "ETH",
      amount: ethers.utils.parseEther("0.000000000000001"),
    });

    const withdrawReceipt = await withdraw.awaitReceipt();
    console.log("withdrawReceipt", withdrawReceipt);

    const verifiedWithdraw = await withdraw.awaitVerifyReceipt();
    console.log("verifiedWithdraw", verifiedWithdraw);
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
