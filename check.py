#!/usr/bin/env python3
"""Validate links.json: 5-cap, required fields, duplicate URLs."""
import json,sys
CAP=5;REQ=("title","url","desc");errs=[];warn=[];seen={}
d=json.load(open(sys.argv[1] if len(sys.argv)>1 else "links.json"))
def chk(l,where):
    for f in REQ:
        if not str(l.get(f,"")).strip(): errs.append(f"{where}: missing '{f}'")
    u=str(l.get("url","")).rstrip("/").lower()
    if u and not u.startswith("https://"): warn.append(f"{where}: non-https url {u}")
    if u in seen: errs.append(f"{where}: duplicate url {u} (also in {seen[u]})")
    else: seen[u]=where
n=0
for c in d.get("categories",[]):
    ls=c.get("links",[]);n+=len(ls)
    for i,l in enumerate(ls): chk(l,f"{c.get('name')}#{i+1}")
    flag=f"  OVERFLOW: {', '.join(l.get('title','?') for l in ls[CAP:])} -> rendered in Archive" if len(ls)>CAP else ""
    print(f"{c.get('name')}: {len(ls)}/{CAP}{flag}")
for i,l in enumerate(d.get("archive",[])):
    chk(l,f"archive#{i+1}")
    if not l.get("category"): warn.append(f"archive#{i+1}: missing 'category'")
print(f"Active: {n} | Archive: {len(d.get('archive',[]))}")
for w in warn: print("WARN",w)
for e in errs: print("ERROR",e)
print("OK" if not errs else "FAILED");sys.exit(1 if errs else 0)
