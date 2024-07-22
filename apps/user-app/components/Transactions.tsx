"use client";

import { useEffect, useState } from "react";
import { useRecoilValue, userAtom } from "@repo/store";
import { useTransactions } from "../hooks/useTransactions";
import { Button } from "@repo/ui/button";

import { Pill } from "./Pill";
import { Filter } from "../../../packages/ui/src/Filter";
import { usePathname, useRouter } from "next/navigation";
import { Refresh } from "./Refersh";
import { Loader } from "./Loader";
import { useSearchParams } from "next/navigation";
export const Transactions = ({
  transactions,
  type,
  count,
}: {
  transactions: any;
  type: string;
  count: number;
}) => {
  const [typeSelected, setTypeSelected] = useState(type);
  const [typeHeading, setTypeHeading] = useState<string>(() => {
    return typeSelected == "p2p" ? "P2P" : "Transfer";
  });
  const [transactionsToDisplay, setTransacitionsToDisplay] = useState({
    transactions: transactions,
    type,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { currTransactions, resetTransactions } = useTransactions(count);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setTypeSelected(type);
    }
  }, []);
  useEffect(() => {
    if (currTransactions.state == "hasValue") {
      if (typeSelected == "p2p") {
        setTypeHeading("P2P");
        setTransacitionsToDisplay({
          transactions: currTransactions.contents.p2pTransaction,
          type: "p2p",
        });
      } else {
        setTypeHeading("Transfer");
        setTransacitionsToDisplay({
          transactions: currTransactions.contents.rampTransaction,
          type: "transfer",
        });
      }
    }
  }, [currTransactions, typeSelected]);

  if (!transactionsToDisplay.transactions) {
    return <div className="text-center pb-8 pt-8">No Recent transactions</div>;
  }
  const user = useRecoilValue(userAtom);

  return (
    <div className="pt-2   relative  ">
      {!user && <Loader />}
      <div className="absolute -top-10 right-2">
        <div className="flex items-start ">
          {pathname == "/transactions" && (
            <div className="flex px-2 mb-5">
              <Filter
                label={typeHeading}
                items={[
                  {
                    name: "Transfer",
                    action: () => setTypeSelected("transfer"),
                  },
                  {
                    name: "P2P transfer",
                    action: () => setTypeSelected("p2p"),
                  },
                ]}
                action={() => {}}
              />
            </div>
          )}
          <div className="flex items-center h-10">
            <Refresh
              action={resetTransactions}
              loading={currTransactions.state == "loading"}
            />
          </div>
        </div>
      </div>

      <div className="py-0 max-h-[40rem] overflow-scroll">
        <br />
        {transactionsToDisplay?.transactions.length == 0 ? (
          <div className="flex justify-center font-legth text-slate-400">
            {"  "}
            <div> No recent "{typeHeading}" transactions found...</div>
          </div>
        ) : (
          transactionsToDisplay?.transactions.map((t: any, i: number) => (
            <div key={i}>
              <Transaction
                heading={t.heading}
                date={t.date}
                amount={t.amount / 100}
                balance={t.balance}
                type={t.type}
                status={t.status}
              ></Transaction>
            </div>
          ))
        )}
      </div>

      {count > 0 && transactionsToDisplay?.transactions.length > 0 && (
        <div className="flex justify-center">
          {"  "}
          <Button
            onClick={() => router.push("/transactions?type=" + typeSelected)}
          >
            {" "}
            View all transactions
          </Button>
        </div>
      )}
    </div>
  );
};

function Transaction({
  heading,
  date,
  amount,
  balance,
  type,
  status,
}: {
  status: string;
  type?: string;
  heading?: string;
  date?: string;
  amount?: number;
  balance?: number;
}) {
  const [pillClass, setPillClass] = useState("");
  useEffect(() => {
    switch (status) {
      case "SUCCESS":
        setPillClass(" text-green-500");
        break;
      case "INITIATED":
        setPillClass("text-yellow-500");
        break;
      case "FAILED":
        setPillClass("text-red-500");
        break;
      case "PROCCESSING":
        setPillClass(" text-orange-500");
    }
  }, []);

  return (
    <div className="flex justify-between mb-4">
      <div className="flex gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#6a51a6"
          className="size-8 "
        >
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex flex-col">
          <div className="text-sm font-semibold">{heading} </div>
          <div className="flex gap-2  items-center text-xs">
            <div className="text-slate-400 ">{date}</div> <div>|</div>
            <Pill
              fill={pillClass}
              onclick={() => {}}
              selected={true}
              title={status}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-slate-600 text-sm font-semibold">
          {type != "ON_RAMP" ? "-" : ""}
          {amount} CAD
        </div>
        <div className="text-slate-400 text-xs">CAD {balance}</div>
      </div>
    </div>
  );
}
