import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";

export default function App() {
    const [dice, setDice] = useState(newDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const firstValue = dice[0].value;
        const allHeld = dice.every((die) => die.held);
        const allSameNumber = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameNumber) {
            setTenzies(true);
        }
    }, [dice]);
    function randomDieValue() {
        return Math.ceil(Math.random() * 6);
    }

    function newDice() {
        const newArray = [];
        for (let i = 0; i < 10; i++) {
            const newDie = {
                value: randomDieValue(),
                held: false,
                id: i + 1,
            };
            newArray.push(newDie);
        }
        return newArray;
    }

    function rollUnheldDice() {
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die, i) =>
                    die.held
                        ? die
                        : { value: randomDieValue(), held: false, id: i + 1 }
                )
            );
        } else {
            setDice(newDice());
            setTenzies(false);
        }
    }

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? { ...die, held: !die.held } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
    ));

    return (
        <div class="main">
            <div class="field">
                {tenzies && <Confetti />}
                <label className="text-5xl font-bold uppercase">Tenzies</label>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className="grid grid-cols-5 gap-5">{diceElements}</div>
                <button
                    className="py-3 w-32 rounded-md font-bold bg-blue-600 cursor-pointer text-lg text-white shadow-sm shadow-black;"
                    onClick={rollUnheldDice}
                >
                    {tenzies ? "Reset Game" : "Roll"}
                </button>
            </div>
        </div>
    );
}
