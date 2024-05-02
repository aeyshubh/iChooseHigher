import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { gql, GraphQLClient } from "graphql-request";
import axios from 'axios';
const AIRSTACK_API_URL = "https://api.airstack.xyz/graphql";
const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

export async function POST(req: NextRequest): Promise<any> {
  const body: FrameRequest = await req.json();
  console.log(body);
  let fid = body.untrustedData.castId.fid;
  let totalHigherBalance = 0;
  const getFid = gql`
query MyQuery {
  Socials(
    input: {filter: {dappName: {_eq: farcaster}, userId: {_eq: "${fid}"}}, blockchain: ethereum}
  ) {
    Social {
      profileName
      fid: userId
      userAssociatedAddresses
    }
  }
}`



  if (!AIRSTACK_API_KEY) throw new Error("AIRSTACK_API_KEY not set");

  const graphQLClient = new GraphQLClient(AIRSTACK_API_URL, {
    headers: {
      Authorization: AIRSTACK_API_KEY, // Add API key to Authorization header
    },
  });
  const getFidData = await graphQLClient.request<any>(getFid);
  let address = getFidData.Socials.Social[0].userAssociatedAddresses;
  let profileName = getFidData.Socials.Social[0].profileName;
  try {

    console.log(address);
    for (let i = 1; i <= address.length - 1; i++) {
      console.log(address[i]);
      let query = gql`
                      query {
                        TokenBalances(
                          input: {filter: {owner: {_eq: "${address[i]}"}, tokenType: {_eq:ERC20}, tokenAddress: {_in: ["0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe"]}}, blockchain: base, limit: 50}
                        ) {
                          TokenBalance {
                            token {
                              name
                              symbol
                            }
                            formattedAmount
                          }
                          pageInfo {
                            nextCursor
                            prevCursor
                          }
                        }
                      }
                      `;
      const data = await graphQLClient.request<any>(query);
      if (data.TokenBalances.TokenBalance != null) {
        let higherBalance = JSON.stringify(data.TokenBalances.TokenBalance[0].formattedAmount);
        totalHigherBalance += Number(higherBalance);
      }
    }
  } catch (e) {
    throw new Error((e as Error)?.message)
  }
  console.log(totalHigherBalance.toFixed(2));

  if(totalHigherBalance <= 5000){
    return NextResponse.json({ message: `${profileName} has ${totalHigherBalance.toFixed(2)} [Fish🐠]` }, { status: 200 });
  }
  else if(totalHigherBalance >=5001 && totalHigherBalance <= 30000){ 
  return NextResponse.json({ message: `${profileName} has ${totalHigherBalance.toFixed(2)} [Shrimp🦐]` }, { status: 200 });
  }else if(totalHigherBalance >=30001 && totalHigherBalance <= 60000){
    return NextResponse.json({ message: `${profileName} has ${totalHigherBalance.toFixed(2)} [Dolphine🐬]` }, { status: 200 });
  }else if(totalHigherBalance >=60001 && totalHigherBalance <= 100000){
    return NextResponse.json({ message: `${profileName} has ${totalHigherBalance.toFixed(2)} [Shark🦈]` }, { status: 200 });
  }else if(totalHigherBalance >=100001){
    return NextResponse.json({ message: `${profileName} has ${totalHigherBalance.toFixed(2)} [Whale🐋]` }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';


