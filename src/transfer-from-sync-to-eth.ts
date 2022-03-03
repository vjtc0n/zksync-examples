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

    if (!(await syncWallet.isSigningKeySet())) {
      if ((await syncWallet.getAccountId()) == undefined) {
        throw new Error("Unknown account");
      }

      // As any other kind of transaction, `ChangePubKey` transaction requires fee.
      // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
      // the lowest possible amount.
      const changePubkey = await syncWallet.setSigningKey({
        feeToken: "ETH",
        ethAuthType: "ECDSA",
      });

      // Wait until the tx is committed
      await changePubkey.awaitReceipt();
    }

    // Committed state is not final yet
    let committedETHBalance = await syncWallet.getBalance("ETH");
    console.log("committedETHBalance", committedETHBalance);

    // Verified state is final
    let verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");
    console.log("verifiedETHBalance", verifiedETHBalance);

    const state = await syncWallet.getAccountState();

    const committedBalances = state.committed.balances;
    committedETHBalance = committedBalances["ETH"] as ethers.BigNumber;
    console.log("committedETHBalance", committedETHBalance);

    const verifiedBalances = state.verified.balances;
    verifiedETHBalance = verifiedBalances["ETH"] as ethers.BigNumber;
    console.log("verifiedETHBalance", verifiedETHBalance);

    return;

    // Transfer from acc1 to acc2 in zksync
    const MNEMONIC2 = process.env.MNEMONIC!;
    const ethWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(
      ethersProvider
    );
    const syncWallet2 = await zksync.Wallet.fromEthSigner(
      ethWallet2,
      syncProvider
    );

    // const amount = zksync.utils.closestPackableTransactionAmount(
    //   ethers.utils.parseEther("0.999")
    // );
    // const fee = zksync.utils.closestPackableTransactionFee(
    //   ethers.utils.parseEther("0.001")
    // );

    // const transfer = await syncWallet.syncTransfer({
    //   to: syncWallet2.address(),
    //   token: "ETH",
    //   amount,
    //   fee,
    // });

    const amount = zksync.utils.closestPackableTransactionAmount(
      ethers.utils.parseEther("0.999")
    );

    const transfer = await syncWallet.syncTransfer({
      to: syncWallet2.address(),
      token: "ETH",
      amount,
    });

    const transferReceipt = await transfer.awaitReceipt();
    console.log("transferReceipt", transferReceipt);
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
