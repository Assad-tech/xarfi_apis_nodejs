import { translateText } from "../lib/translator.js";
import BankDetail from "../models/BankDetail.js";

export const store = async (req, res) => {
  try {
    const { accountTitle, bank, iban, bic } = req.body;

    const accountTitleTranslations = await translateText(accountTitle, ["de"]);
    const accountTitleObj = {
      en: accountTitle,
      de: accountTitleTranslations.de,
    };

    const bankDetail = await BankDetail.create({
      owner: req.user._id,
      accountTitle: accountTitleObj,
      bank,
      iban,
      bic,
    });

    res.status(201).json({
      status: 1,
      data: bankDetail,
      message: "Bank Detail created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message,
    });
  }
};
